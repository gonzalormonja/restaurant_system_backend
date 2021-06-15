import { DataTypes } from 'sequelize';
import db from '../db/connection';

const MenuIngredient = db.define('menus_ingredients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idMenu: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  idIngredient: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  quantity: {
    type: DataTypes.FLOAT,
    validate: {
      notEmpty: true
    }
  }
});

export default MenuIngredient;
