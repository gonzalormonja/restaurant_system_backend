import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Menu from './menu';

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
  }
});

Category.belongsTo(Category, { foreignKey: 'idCategory' });

Category.hasMany(Menu, {
  foreignKey: 'idCategory'
});
Menu.belongsTo(Category, { foreignKey: 'idCategory' });
export default Category;
