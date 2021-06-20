"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const characteristic_1 = __importDefault(require("./characteristic"));
const customer_1 = __importDefault(require("./customer"));
const ingredient_1 = __importDefault(require("./ingredient"));
const productCharacteristic_1 = __importDefault(require("./productCharacteristic"));
const productGarnish_1 = __importDefault(require("./productGarnish"));
const productIngredient_1 = __importDefault(require("./productIngredient"));
const price_1 = __importDefault(require("./price"));
const timesOfDay_1 = __importDefault(require("./timesOfDay"));
const productTimesOfDay_1 = __importDefault(require("./productTimesOfDay"));
const Product = connection_1.default.define('products', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    bar_code: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null
    },
    short_name: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    idCategory: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    },
    maximum_of_flavors: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    isGarnish: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    approximate_delay_minutes: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idCustomer: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    }
});
customer_1.default.hasMany(Product, { foreignKey: 'idCustomer' });
Product.belongsTo(customer_1.default, { foreignKey: 'idCustomer' });
Product.belongsToMany(Product, {
    through: productGarnish_1.default,
    foreignKey: 'idGarnish',
    otherKey: 'idProduct',
    as: 'productsOfGarnish'
});
Product.belongsToMany(Product, {
    through: productGarnish_1.default,
    foreignKey: 'idProduct',
    otherKey: 'idGarnish',
    as: 'garnishes'
});
Product.hasMany(price_1.default, { foreignKey: 'idProduct' });
Product.belongsToMany(ingredient_1.default, {
    through: productIngredient_1.default,
    foreignKey: 'idProduct',
    otherKey: 'idIngredient'
});
ingredient_1.default.belongsToMany(Product, {
    through: productIngredient_1.default,
    foreignKey: 'idIngredient',
    otherKey: 'idProduct'
});
Product.belongsToMany(characteristic_1.default, {
    through: productCharacteristic_1.default,
    foreignKey: 'idProduct',
    otherKey: 'idCharacteristic'
});
characteristic_1.default.belongsToMany(Product, { through: productCharacteristic_1.default, foreignKey: 'idProduct' });
Product.belongsToMany(timesOfDay_1.default, {
    through: productTimesOfDay_1.default,
    foreignKey: 'idProduct',
    otherKey: 'idTimeOfDay'
});
timesOfDay_1.default.belongsToMany(Product, { through: productTimesOfDay_1.default, foreignKey: 'idProduct' });
exports.default = Product;
//# sourceMappingURL=product.js.map