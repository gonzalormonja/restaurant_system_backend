import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Characteristic = db.define('characteristics', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  }
});

export default Characteristic;
