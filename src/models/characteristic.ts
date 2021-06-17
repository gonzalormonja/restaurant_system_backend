import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Customer from './customer';

interface CharacteristicInterface extends Model {
  id: number;
  name: string;
  idCustomer: number;
}

type CharacteristicStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CharacteristicInterface;
};

const Characteristic = db.define('characteristics', {
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
}) as CharacteristicStatic;

Customer.hasMany(Characteristic, { foreignKey: 'idCustomer' });
Characteristic.belongsTo(Customer, { foreignKey: 'idCustomer' });

export default Characteristic;
