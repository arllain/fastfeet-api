import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import DeliveryMan from '../app/models/DeliveryMan';
import Delivery from '../app/models/Delivery';
import File from '../app/models/File';
import Product from '../app/models/Product';
import DeliveryProblem from '../app/models/DeliveryProblem';

const models = [
  User,
  Recipient,
  DeliveryMan,
  File,
  Product,
  Delivery,
  DeliveryProblem,
];

class Database {
  constructor() {
    this.postgre();
    this.mongo();
  }

  postgre() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
