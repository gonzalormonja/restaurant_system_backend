import { BuildOptions, DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Menu from './menu';

interface Category extends Model {
  id: number;
  name: string;
  idCategory: number;
  state: boolean;
}

type CategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Category;
};

const CategoryModel = db.define('categories', {
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
  }
}) as CategoryStatic;

CategoryModel.belongsTo(CategoryModel, { foreignKey: 'idCategory' });

CategoryModel.hasMany(Menu, {
  foreignKey: 'idCategory'
});
Menu.belongsTo(CategoryModel, { foreignKey: 'idCategory' });
export default CategoryModel;
