import Mail from '../../lib/Mail';

class SendDeliveryMail {
  get key() {
    return 'SendDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'New Delivery',
      template: 'sendDeliveryMail',
      context: {
        develiryman: delivery.deliveryman.name,
        product: delivery.product.name,
        deliveryId: delivery.id,
        recipientName: delivery.recipient.name,
        recipientStreet: delivery.recipient.street,
        recipientNumber: delivery.recipient.number,
        recipientZipCode: delivery.recipient.zipcode,
        recipientCity: delivery.recipient.city,
        recipientState: delivery.recipient.state,
        recipientComplement: delivery.recipient.complement || '',
      },
    });
  }
}

export default new SendDeliveryMail();
