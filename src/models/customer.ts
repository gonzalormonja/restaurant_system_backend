import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface CustomerInterface extends Model {
  id: number;
  name: string;
  phone: string;
  email: string;
}

type CustomerStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CustomerInterface;
};

const Customer = db.define('customers', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: null
  }
}) as CustomerStatic;

export default Customer;
