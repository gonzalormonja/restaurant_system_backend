import { DataTypes } from 'sequelize';
import db from '../db/connection';

const MenuCharacteristic = db.define('menus_characteristics', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idMenu: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  idCharacteristic: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
});

export default MenuCharacteristic;
