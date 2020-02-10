import Op from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

class ViewDeliveryController {
  async index(req, res) {
    const { page = 1, filtro = '0' } = req.query;
    const { deliveryman_id } = req.params;

    let deliveries = [{ message: 'No deliveries found.' }];

    if (filtro === '1') {
      deliveries = await Delivery.findAll({
        where: {
          deliveryman_id,
          end_date: {
            [Op.ne]: null,
          },
        },
        include: [
          {
            model: DeliveryMan,
            as: 'deliveryman',
            attributes: ['name', 'email'],
          },
          {
            model: Recipient,
            as: 'recipient',
            attributes: ['name', 'street', 'zipcode', 'number'],
          },
        ],
        order: ['id'],
        limit: 20,
        offset: (page - 1) * 20,
      });
    } else {
      deliveries = await Delivery.findAll({
        where: {
          deliveryman_id,
          end_date: null,
          canceled_at: null,
        },
        include: [
          {
            model: DeliveryMan,
            as: 'deliveryman',
            attributes: ['name', 'email'],
          },
          {
            model: Recipient,
            as: 'recipient',
            attributes: ['name', 'street', 'zipcode', 'number'],
          },
        ],
        order: ['id'],
        limit: 20,
        offset: (page - 1) * 20,
      });
    }
    return res.json(deliveries);
  }
}

export default new ViewDeliveryController();
