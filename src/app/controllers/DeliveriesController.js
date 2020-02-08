import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import Deliveries from '../models/Deliveries';
import Product from '../models/Product';
import File from '../models/File';

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
      recipient_id: Yup.number(),
      deliverer_id: Yup.number(),
      product_id: Yup.number(),
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
    return res.json(deliveries);
  }
}

export default new DeliveriesController();
