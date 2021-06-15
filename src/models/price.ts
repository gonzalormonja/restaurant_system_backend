import { BuildOptions, Model } from 'sequelize';
import { DataTypes } from 'sequelize';
import db from '../db/connection';

interface Price extends Model {
  id: number;
  price: number;
  idMenu: number;
}

type PriceStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Price;
};

const PriceModel = db.define('prices', {
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
  idMenu: {
    type: DataTypes.INTEGER,
    defaultValue: null
  }
}) as PriceStatic;

export default PriceModel;
