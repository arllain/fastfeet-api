import * as Yup from 'yup';
import Deliverer from '../models/Deliverer';

class DelivererController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number().nullable(),
      email: Yup.string()
        .required()
        .email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const delivererExists = await Deliverer.findOne({
      where: { email: req.body.email },
    });

    if (delivererExists) {
      return res.status(400).json({ erro: 'Deliverer already exists' });
    }

    const { id, name, email, avatar_id } = await Deliverer.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }
}

export default new DelivererController();
