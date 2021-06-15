import { DataTypes } from 'sequelize';
import db from '../db/connection';

const MenuGarnish = db.define('menus_garnishes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idMenu: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  idGarnish: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  max_quantity: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  }
});

export default MenuGarnish;
