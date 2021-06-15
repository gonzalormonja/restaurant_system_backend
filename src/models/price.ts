import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Price = db.define('prices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  price: {
    type: DataTypes.FLOAT,
    validate: {
      notEmpty: true
    }
  },
  idMenu: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
});

export default Price;
