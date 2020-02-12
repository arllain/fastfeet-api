import Mail from '../../lib/Mail';

class CancellationDeliveryMail {
  get key() {
    return 'CancellationDeliveryMail';
  }

  async handle({ data }) {
    const { delivery, problem, startDate, canceled_at } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: `Delivery Cancellation`,
      template: 'sendCancelDeliveryMail',
      context: {
        deliveryId: delivery.id,
        product: delivery.product.name,
        deliveryman: delivery.deliveryman.name,
        description: problem.description,
        startDate,
        canceled_at,
      },
    });
  }
}

export default new CancellationDeliveryMail();
