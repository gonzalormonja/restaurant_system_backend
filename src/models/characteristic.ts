import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface CharacteristicInterface extends Model {
  id: number;
  name: string;
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
  }
}) as CharacteristicStatic;

export default Characteristic;
