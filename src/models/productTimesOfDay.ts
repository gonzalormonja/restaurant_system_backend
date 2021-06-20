import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface ProductTimeOfDayInterface extends Model {
  id: number;
  idProduct: number;
  idTimeOfDay: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductTimeOfDayStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductTimeOfDayInterface;
};

const ProductTimeOfDay = db.define('products_times_of_day', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idProduct: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  idTimeOfDay: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  }
}) as ProductTimeOfDayStatic;

export default ProductTimeOfDay;
