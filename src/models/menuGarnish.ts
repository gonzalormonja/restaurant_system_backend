import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface MenuGarnish extends Model {
  id: number;
  idMenu: number;
  idGarnish: number;
  max_quantity: number;
}

type MenuGarnishStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MenuGarnish;
};

const MenuGarnishModel = db.define('menus_garnishes', {
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
    defaultValue: 1
  }
}) as MenuGarnishStatic;

export default MenuGarnishModel;
