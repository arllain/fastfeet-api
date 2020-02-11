import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
  isBefore,
} from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';

class StartDeliveryController {
  async update(req, res) {
    const { deliveryId, deliverymanId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const deliveryman = await DeliveryMan.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        start_date: null,
        canceled_at: null,
      },
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const searchDate = Number(date);

    const deliveryTime = ['08:00', '18:00'];

    const availables = deliveryTime.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          time === deliveryTime[1]
            ? isAfter(value, new Date())
            : isBefore(value, new Date()),
      };
    });

    if (!(availables[0].available && availables[1].available)) {
      return res
        .status(400)
        .json({ error: `Deliveries are only allowed from 08:00 to 18:00` });
    }

    const { count } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: deliverymanId,
        start_date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    if (count > 5) {
      return res.status(400).json({
        error:
          'You have reached the maximum of 5 deliveries permitted  for today',
      });
    }

    delivery.start_date = new Date();
    delivery.save();

    return res.json(delivery);
  }
}

export default new StartDeliveryController();
