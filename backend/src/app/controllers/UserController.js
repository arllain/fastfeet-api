//import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async show(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    return res.json(user);
  }
}
export default new UserController();
