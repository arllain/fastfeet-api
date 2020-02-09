import * as Yup from 'yup';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import Deliveries from '../models/Deliveries';
import Product from '../models/Product';
import File from '../models/File';
import Notification from '../schemas/Notification';

class DeliveriesController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const deliveries = await Deliveries.findAll({
      attributes: ['id', 'start_date', 'end_date', 'canceled_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
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
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email', 'avatar_id'],
          include: [{ model: File, as: 'avatar', attributes: ['url', 'path'] }],
        },
      ],
    });
    res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { recipient_id, deliveryman_id, product_id } = req.body;

    /**
     * Check if recipient exists
     */
    const recipient = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    /**
     * Check if deliverer exists
     */
    const deliveryman = await DeliveryMan.findOne({
      where: { id: deliveryman_id },
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'DeliveryMan not found' });
    }

    /**
     * Check if product exists
     */
    const product = await Product.findOne({
      where: { id: product_id },
    });

    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }

    const deliveries = await Deliveries.create({
      recipient_id,
      deliveryman_id,
      product_id,
    });

    /**
     * Notify deliveryman for new deliveries
     */

    // const deliveryman = await DeliveryMan.findByPk(deliveryman_id);
    const formattedDate = format(
      new Date(),
      "'dia' dd 'de' MMMM', às' H:mm'h' ",
      {
        locale: ptBR,
      }
    );

    await Notification.create({
      content: `${deliveryman.name}, você tem uma nova entrega cadastrada no 
      ${formattedDate}, e já encontra-se disponível para retirada.`,
      deliveryman: deliveryman_id,
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const deliveries_id = req.params.id;

    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const deliveries = await Deliveries.findByPk(deliveries_id);

    if (!deliveries) {
      return res.status(400).json({ erro: 'Delivery not found' });
    }
    const {
      id,
      recipient_id,
      deliveryman_id,
      product_id,
    } = await deliveries.update(req.body);
    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveries = await Deliveries.destroy({
      where: { id },
    });

    if (deliveries) {
      return res.status(200).json({ deleted: 'The delivery was deleted' });
    }

    return res.status(400).json({ erro: 'Delivery not found' });
  }
}

export default new DeliveriesController();
