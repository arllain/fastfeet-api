import * as Yup from 'yup';
import Deliverer from '../models/Deliverer';
import File from '../models/File';

class DelivererController {
  async index(req, res) {
    const deliverers = await Deliverer.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
        },
      ],
    });
    res.json(deliverers);
  }

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

  async update(req, res) {
    const deliverer_id = req.params.id;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      avatar_id: Yup.number().nullable(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const deliverer = await Deliverer.findByPk(deliverer_id);

    if (!deliverer) {
      return res.status(400).json({ erro: 'Deliverer not found' });
    }
    const { id, name, email, avatar_id } = await deliverer.update(req.body);
    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const id = req.params.id;

    const deliverer = await Deliverer.destroy({
      where: { id },
    });

    if (deliverer) {
      return res.status(200).json({ deleted: 'The deliverer was deleted' });
    }

    return res.status(400).json({ erro: 'Deliverer not found' });
  }
}

export default new DelivererController();
