import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Ingredient = db.define('ingredients', {
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
  },
  unit_of_measure: {
    type: DataTypes.STRING,
    defaultValue: null
  }
});

export default Ingredient;
