import Sequelize, { Model } from 'sequelize';
import baseURL from '../../config/baseURL';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return baseURL.url + this.path;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
export default File;
