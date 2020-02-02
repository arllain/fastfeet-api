import User from '../models/User';

class UserController {
  async show(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.json(user);
  }
}
export default new UserController();
