// import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import DeliveryProblem from './DeliveryProblemController';
import Recipient from '../models/Recipient';
import Queue from '../../lib/Queue';
import CancellationDeliveryMail from '../jobs/CancellationDeliveryMail';

class CancelDeliveryController {
  async update(req, res) {
    const { problemId } = req.params;

    const { delivery_id } = await DeliveryProblem.findByPk(problemId);

    const delivery = await Delivery.findByPk(delivery_id, {
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
        },
      ],
    });

    if (!delivery) return res.status(400).json({ error: 'Delivery not found' });

    if (delivery.canceled_at)
      return res
        .status(400)
        .json({ error: 'Delivery has already been canceled' });

    delivery.canceled_at = new Date();
    delivery.save();

    await Queue.add(CancellationDeliveryMail.key, {
      delivery,
    });

    return res.json(delivery);
  }
}

export default new CancelDeliveryController();
