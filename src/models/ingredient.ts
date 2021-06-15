import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface Ingredient extends Model {
  id: number;
  name: string;
  unit_of_measure: string;
}

type IngredientStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Ingredient;
};

const IngredientModel = db.define('ingredients', {
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
  unit_of_measure: {
    type: DataTypes.STRING,
    defaultValue: null
  }
}) as IngredientStatic;

export default IngredientModel;
