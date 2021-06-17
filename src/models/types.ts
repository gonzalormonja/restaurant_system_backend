import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Customer from './customer';

interface TypeInterface extends Model {
  id: number;
  name: string;
  idCustomer: number;
}

type TypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TypeInterface;
};

const Type = db.define('types', {
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
  idCustomer: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  }
}) as TypeStatic;

Customer.hasMany(Type, { foreignKey: 'idCustomer' });
Type.belongsTo(Customer, { foreignKey: 'idCustomer' });

export default Type;
