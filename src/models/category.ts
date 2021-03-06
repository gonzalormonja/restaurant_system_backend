import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Customer from './customer';
import Product from './product';

interface CategoryInterface extends Model {
  id: number;
  name: string;
  idCategory: number;
  state: boolean;
  idCustomer: number;
  createdAt: Date;
  updatedAt: Date;
}

type CategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoryInterface;
};

const Category = db.define('categories', {
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
  idCategory: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  idCustomer: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  }
}) as CategoryStatic;

Customer.hasMany(Category, { foreignKey: 'idCustomer' });
Category.belongsTo(Customer, { foreignKey: 'idCustomer' });

Category.belongsTo(Category, { foreignKey: 'idCategory' });

Category.hasMany(Product, {
  foreignKey: 'idCategory'
});
Product.belongsTo(Category, { foreignKey: 'idCategory' });
export default Category;
