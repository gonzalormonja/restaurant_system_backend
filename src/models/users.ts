import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Customer from './customer';
import Type from './types';

interface UserInterface extends Model {
  id: number;
  name: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  idCustomer: number;
  idType: number;
}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInterface;
};

const User = db.define('users', {
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
  },
  username: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  idCustomer: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  idType: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  }
}) as UserStatic;

Customer.hasMany(User, { foreignKey: 'idCustomer' });
User.belongsTo(Customer, { foreignKey: 'idCustomer' });

User.hasOne(Type, { foreignKey: 'idType' });
Type.belongsTo(User, { foreignKey: 'idType' });

export default User;
