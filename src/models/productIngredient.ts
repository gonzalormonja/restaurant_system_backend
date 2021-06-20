import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface ProductIngredientInterface extends Model {
  id: number;
  idProduct: number;
  idIngredient: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductIngredientStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductIngredientInterface;
};

const ProductIngredient = db.define('products_ingredients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idProduct: {
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
}) as ProductIngredientStatic;

export default ProductIngredient;
