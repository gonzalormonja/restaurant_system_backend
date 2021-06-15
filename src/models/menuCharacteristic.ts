import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface MenuCharacteristic extends Model {
  id: number;
  idMenu: number;
  idCharacteristic: number;
}

type MenuCharacteristicStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MenuCharacteristic;
};

const MenuCharacteristicModel = db.define('menus_characteristics', {
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
}) as MenuCharacteristicStatic;

export default MenuCharacteristicModel;
