import { Model, DataTypes, BuildOptions } from 'sequelize';
import db from '../db/connection';
import Characteristic from './characteristic';
import Customer from './customer';
import Ingredient from './ingredient';
import ProductCharacteristic from './productCharacteristic';
import ProductGarnish from './productGarnish';
import ProductIngredient from './productIngredient';
import Price from './price';
import TimeOfDay from './timesOfDay';
import ProductTimeOfDay from './productTimesOfDay';

interface ProductInterface extends Model {
  id: number;
  name: string;
  bar_code: string;
  short_name: string;
  idCategory: number;
  maximum_of_flavors: number;
  state: boolean;
  isGarnish: boolean;
  idCustomer: number;
  approximate_delay_minutes: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductInterface;
};

const Product = db.define('products', {
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
  approximate_delay_minutes: {
    type: DataTypes.INTEGER
  },
  idCustomer: {
    type: DataTypes.INTEGER,
    validate: {
      notEmpty: true
    }
  }
}) as ProductStatic;

Customer.hasMany(Product, { foreignKey: 'idCustomer' });
Product.belongsTo(Customer, { foreignKey: 'idCustomer' });

Product.belongsToMany(Product, {
  through: ProductGarnish,
  foreignKey: 'idGarnish',
  otherKey: 'idProduct',
  as: 'productsOfGarnish'
});

Product.belongsToMany(Product, {
  through: ProductGarnish,
  foreignKey: 'idProduct',
  otherKey: 'idGarnish',
  as: 'garnishes'
});

Product.hasMany(Price, { foreignKey: 'idProduct' });

Product.belongsToMany(Ingredient, {
  through: ProductIngredient,
  foreignKey: 'idProduct',
  otherKey: 'idIngredient'
});

Ingredient.belongsToMany(Product, {
  through: ProductIngredient,
  foreignKey: 'idIngredient',
  otherKey: 'idProduct'
});

Product.belongsToMany(Characteristic, {
  through: ProductCharacteristic,
  foreignKey: 'idProduct',
  otherKey: 'idCharacteristic'
});

Characteristic.belongsToMany(Product, { through: ProductCharacteristic, foreignKey: 'idProduct' });

Product.belongsToMany(TimeOfDay, {
  through: ProductTimeOfDay,
  foreignKey: 'idProduct',
  otherKey: 'idTimeOfDay'
});

TimeOfDay.belongsToMany(Product, { through: ProductTimeOfDay, foreignKey: 'idProduct' });

export default Product;
