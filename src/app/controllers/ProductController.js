import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const products = await Product.findAll({
      attributes: ['id', 'name'],
    });
    res.json(products);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    /*
    const productExists = await Product.findOne({
      where: { name: req.body.name },
    });

    if (productExists) {
      return res.status(400).json({ erro: 'Products already exists' });
    }
*/
    const { id, name } = await Product.create(req.body);

    return res.json({
      id,
      name,
    });
  }

  async update(req, res) {
    const product_id = req.params.id;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(400).json({ erro: 'Product not found' });
    }
    const { id, name } = await product.update(req.body);
    return res.json({
      id,
      name,
    });
  }

  async delete(req, res) {
    const id = req.params.id;

    const product = await Product.destroy({
      where: { id },
    });

    if (product) {
      return res.status(200).json({ deleted: 'The product was deleted' });
    }

    return res.status(400).json({ erro: 'Product not found' });
  }
}

export default new ProductController();
