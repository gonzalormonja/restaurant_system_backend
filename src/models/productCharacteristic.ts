import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface ProductCharacteristicInterface extends Model {
  id: number;
  idProduct: number;
  idCharacteristic: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductCharacteristicStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductCharacteristicInterface;
};

const ProductCharacteristic = db.define('products_characteristics', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idProduct: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  idCharacteristic: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
}) as ProductCharacteristicStatic;

export default ProductCharacteristic;
