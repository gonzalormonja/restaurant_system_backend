import { BuildOptions, Model } from 'sequelize';
import { DataTypes } from 'sequelize';
import db from '../db/connection';

interface PriceInterface extends Model {
  id: number;
  price: number;
  idProduct: number;
}

type PriceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PriceInterface;
};

const Price = db.define('prices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  price: {
    type: DataTypes.FLOAT,
    validate: {
      notEmpty: true
    }
  },
  idProduct: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
}) as PriceStatic;

export default Price;
