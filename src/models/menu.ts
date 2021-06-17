import { Model, DataTypes, BuildOptions } from 'sequelize';
import db from '../db/connection';
import Characteristic from './characteristic';
import Ingredient from './ingredient';
import MenuCharacteristic from './menuCharacteristic';
import MenuGarnish from './menuGarnish';
import MenuIngredient from './menuIngredient';
import Price from './price';

interface MenuInterface extends Model {
  id: number;
  name: string;
  bar_code: string;
  short_name: string;
  idCategory: number;
  maximum_of_flavors: number;
  state: boolean;
  isGarnish: boolean;
}

type MenuStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MenuInterface;
};

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
  },
  approximate_delay_minutes:{
    type: DataTypes.INTEGER
  }
}) as MenuStatic;

Menu.belongsToMany(Menu, {
  through: MenuGarnish,
  foreignKey: 'idGarnish',
  otherKey: 'idMenu',
  as: 'menusOfGarnish'
});

Menu.belongsToMany(Menu, {
  through: MenuGarnish,
  foreignKey: 'idMenu',
  otherKey: 'idGarnish',
  as: 'garnishes'
});

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
