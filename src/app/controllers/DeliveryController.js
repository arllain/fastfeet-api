import * as Yup from 'yup';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';
import Product from '../models/Product';
import File from '../models/File';
import Notification from '../schemas/Notification';
import Queue from '../../lib/Queue';
import SendDeliveryMail from '../jobs/SendDeliveryMail';

class DeliveryController {
  async index(req, res) {
    const { page = 1, q = '' } = req.query;
    const limit = 6;
    const offset = (page - 1) * limit;
    const delivery = await Delivery.findAll({
      attributes: ['id', 'start_date', 'end_date', 'canceled_at'],
      limit,
      offset,
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
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name'],
          where: {
            name: {
              [Op.iLike]: `%${q}%`,
            },
          },
        },
        { model: File, as: 'file', attributes: ['url', 'path'] },
      ],
      order: ['id'],
    });
    res.json(delivery);
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

    const deliv = await Delivery.create({
      recipient_id,
      deliveryman_id,
      product_id,
    });

    const formattedDate = format(
      new Date(),
      "'dia' dd 'de' MMMM', às' H:mm'h' ",
      {
        locale: ptBR,
      }
    );

    /**
     *  Notify deliveryman for new delivery by email
     */
    const delivery = await Delivery.findByPk(deliv.id, {
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
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
    });

    await Queue.add(SendDeliveryMail.key, {
      delivery,
    });

    /**
     * Notify deliveryman for new delivery by messege
     */
    await Notification.create({
      content: `${deliveryman.name}, você tem uma nova entrega cadastrada no 
      ${formattedDate}, e já encontra-se disponível para retirada.`,
      deliveryman: deliveryman_id,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const delivery_id = req.params.id;

    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ erro: 'Delivery not found' });
    }
    const {
      id,
      recipient_id,
      deliveryman_id,
      product_id,
    } = await delivery.update(req.body);
    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.destroy({
      where: { id },
    });

    if (delivery) {
      return res.status(200).json({ deleted: 'The delivery was deleted' });
    }

    return res.status(400).json({ erro: 'Delivery not found' });
  }
}

export default new DeliveryController();
