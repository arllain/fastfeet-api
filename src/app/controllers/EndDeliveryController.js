import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class EndDeliveryController {
  async update(req, res) {
    const { deliveryId, deliverymanId } = req.params;
    const { file } = req;

    const schema = Yup.object().shape({
      originalname: Yup.string().required(),
      filename: Yup.string().required(),
    });

    if (!(await schema.isValid(file))) {
      return res.status(401).json({ error: 'Validations fails' });
    }

    const deliveryman = await DeliveryMan.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        start_date: {
          [Op.ne]: null,
        },
        end_date: null,
        canceled_at: null,
      },
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const { originalname: name, filename: path } = file;

    const { id } = await File.create({
      name,
      path,
    });

    delivery.end_date = new Date();
    delivery.signature_id = id;
    delivery.save();

    return res.json(delivery);
  }
}

export default new EndDeliveryController();
