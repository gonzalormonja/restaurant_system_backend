import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Customer from './customer';

interface TimeOfDayInterface extends Model {
  id: number;
  name: string;
  hour_start;
  hour_end;
  idCustomer: number;
  createdAt: Date;
  updatedAt: Date;
}

type TimeOfDayStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TimeOfDayInterface;
};

const TimeOfDay = db.define(
  'times_of_day',
  {
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
    hour_start: {
      type: DataTypes.TIME,
      validate: {
        notEmpty: true
      }
    },
    hour_end: {
      type: DataTypes.TIME,
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
  },
  { freezeTableName: true }
) as TimeOfDayStatic;

Customer.hasMany(TimeOfDay, { foreignKey: 'idCustomer' });
TimeOfDay.belongsTo(Customer, { foreignKey: 'idCustomer' });

export default TimeOfDay;
