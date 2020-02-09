import Notification from '../schemas/Notification';
import DeliveryMan from '../models/DeliveryMan';

class NotificationController {
  async index(req, res) {
    /**
     * Check if deliveryman exists
     */
    const { deliveryman_id } = req.params;

    const deliveryman = await DeliveryMan.findOne({
      where: { id: deliveryman_id },
    });

    if (!deliveryman) {
      return res.status(400).json({
        error: 'Delivery man not found',
      });
    }

    const notifications = await Notification.find({
      deliveryman: deliveryman_id,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
