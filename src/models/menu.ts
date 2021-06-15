import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Characteristic from './characteristic';
import Ingredient from './ingredient';
import MenuCharacteristic from './menuCharacteristic';
import MenuGarnish from './menuGarnish';
import MenuIngredient from './menuIngredient';
import Price from './price';

const Menu = db.define('menus', {
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
  bar_code: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  short_name: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  idCategory: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  maximum_of_flavors: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isGarnish: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

Menu.belongsToMany(Menu, {
  through: MenuGarnish,
  foreignKey: 'idGarnish',
  otherKey: 'idMenu',
  as: 'menusOfGranish'
});
Menu.belongsToMany(Menu, { through: MenuGarnish, foreignKey: 'idMenu', otherKey: 'idGarnish', as: 'garnishes' });

Menu.hasMany(Price, { foreignKey: 'idMenu' });

Menu.belongsToMany(Ingredient, {
  through: MenuIngredient,
  foreignKey: 'idMenu',
  otherKey: 'idIngredient'
});
Ingredient.belongsToMany(Menu, {
  through: MenuIngredient,
  foreignKey: 'idIngredient',
  otherKey: 'idMenu'
});

Menu.belongsToMany(Characteristic, {
  through: MenuCharacteristic,
  foreignKey: 'idMenu',
  otherKey: 'idCharacteristic'
});
Characteristic.belongsToMany(Menu, { through: MenuCharacteristic, foreignKey: 'idMenu' });

export default Menu;
