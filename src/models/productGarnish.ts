import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface ProductGarnishInterface extends Model {
  id: number;
  idProduct: number;
  idGarnish: number;
  max_quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductGarnishStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductGarnishInterface;
};

const ProductGarnish = db.define('products_garnishes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idProduct: {
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
}) as ProductGarnishStatic;

export default ProductGarnish;
