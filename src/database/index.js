import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import DeliveryMan from '../app/models/DeliveryMan';
import Deliveries from '../app/models/Deliveries';
import File from '../app/models/File';
import Product from '../app/models/Product';

const models = [User, Recipient, DeliveryMan, File, Product, Deliveries];

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
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/fastfeet',
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
