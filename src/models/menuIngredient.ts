import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface MenuIngredient extends Model {
  id: number;
  idMenu: number;
  idIngredient: number;
  quantity: number;
}

type MenuIngredientStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MenuIngredient;
};

const MenuIngredientModel = db.define('menus_ingredients', {
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
}) as MenuIngredientStatic;

export default MenuIngredientModel;
