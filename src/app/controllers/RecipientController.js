import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findOne({
      where: { id },
    });
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    return res.json(recipient);
  }

  async index(req, res) {
    const { page = 1, q = '' } = req.query;
    const limit = 6;
    const offset = (page - 1) * limit;
    const recipient = await Recipient.findAll({
      limit,
      offset,
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      order: ['id'],
    });
    res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    try {
      const recipientExists = await Recipient.findOne({
        where: { name: req.body.name },
      });

      if (recipientExists) {
        return res.status(400).json({ erro: 'Recipient already exists' });
      }

      const {
        name,
        street,
        number,
        complement,
        state,
        city,
        zipcode,
      } = await Recipient.create(req.body);

      return res.json({
        name,
        street,
        number,
        complement,
        state,
        city,
        zipcode,
      });
    } catch (error) {
      console.log('Error creating a recipient', error);
      return res.status(500).json({ error: 'Recipient could not be created' });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    if (!req.params.id) return res.status(400).json({ error: 'Invalid id.' });

    try {
      const recipient = await Recipient.findByPk(req.params.id);

      if (!recipient) {
        return res.status(400).json({ erro: 'Recipient not found' });
      }
      const {
        name,
        street,
        number,
        complement,
        state,
        city,
        zipcode,
      } = await recipient.update(req.body);

      return res.json({
        name,
        street,
        number,
        complement,
        state,
        city,
        zipcode,
      });
    } catch (error) {
      console.log('Error updating the recipient', error);
      return res.status(500).json({ error: 'Recipient could not be updated' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.destroy({
      where: { id },
    });

    if (recipient) {
      return res
        .status(200)
        .json({ deleted: 'The Recipient was succesful deleted' });
    }

    return res.status(400).json({ erro: 'Recipient not found' });
  }
}

export default new RecipientController();
