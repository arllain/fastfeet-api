import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
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
        deliveryId: delivery.id,
        recipient: delivery.recipient.name,
        product: delivery.product.name,
      },
    });
  }
}

export default new SendDeliveryMail();
