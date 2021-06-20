import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Customer from './customer';

interface IngredientInterface extends Model {
  id: number;
  name: string;
  unit_of_measure: string;
  idCustomer: number;
  createdAt: Date;
  updatedAt: Date;
}

type IngredientStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IngredientInterface;
};

const Ingredient = db.define('ingredients', {
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
  },
  idCustomer: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  }
}) as IngredientStatic;

Customer.hasMany(Ingredient, { foreignKey: 'idCustomer' });
Ingredient.belongsTo(Customer, { foreignKey: 'idCustomer' });

export default Ingredient;
