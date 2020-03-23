import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import DeliveryMan from '../models/DeliveryMan';
import Product from '../models/Product';
import Recipient from '../models/Recipient';
import CancelDeliveryMail from '../jobs/CancelDeliveryMail';

import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const limit = 6;
    const offset = (page - 1) * limit;
    const deliveryProblems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      limit,
      offset,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'start_date', 'end_date', 'canceled_at'],
          order: ['id'],
          include: [
            {
              model: DeliveryMan,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'name',
                'street',
                'number',
                'complement',
                'state',
                'city',
                'zipcode',
              ],
            },
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryExists = await Delivery.findOne({
      where: { id },
    });

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const deliveryProblems = await DeliveryProblem.findAll({
      attributes: ['id', 'description'],
      where: { delivery_id: id },
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['id', 'start_date', 'end_date', 'canceled_at'],
          include: [
            {
              model: DeliveryMan,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'name',
                'street',
                'number',
                'complement',
                'state',
                'city',
                'zipcode',
              ],
            },
            {
              model: Product,
              as: 'product',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object(req.body).shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail' });
    }

    const { id } = req.params;
    const { description } = req.body;

    const deliveryExists = await Delivery.findOne({
      where: { id },
    });

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const problem = await DeliveryProblem.create({
      description,
      delivery_id: id,
    });

    return res.json(problem);
  }

  async updat(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblem.findOne({
      where: { id },
    });

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Problem not found' });
    }

    const delivery = await Delivery.findByPk(deliveryProblem.delivery_id, {
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['name'],
        },
      ],
    });

    if (delivery.end_date !== null && delivery.signature_id !== null) {
      return res
        .status(400)
        .json(
          "This delivery cannot be cancelled because it's been delivered already"
        );
    }

    delivery.update(
      {
        canceled_at: new Date(),
      },
      {
        where: {
          id: deliveryProblem.delivery_id,
        },
      }
    );

    let startDate = '';
    if (delivery.startDate) {
      startDate = format(
        delivery.start_date,
        "'dia' dd 'de' MMMM', às' H:mm'h'",
        { locale: pt }
      );
    }

    let canceled_at = '';
    if (delivery.canceled_at) {
      canceled_at = format(
        delivery.canceled_at,
        "'dia' dd 'de' MMMM', às' H:mm'h'",
        {
          locale: pt,
        }
      );
    }

    await Queue.add(CancelDeliveryMail.key, {
      delivery,
      problem: deliveryProblem,
      startDate,
      canceled_at,
    });

    return res
      .status(200)
      .json({ message: `Delivery Id ${delivery.id}, has been canceled` });
  }
}

export default new DeliveryProblemController();
