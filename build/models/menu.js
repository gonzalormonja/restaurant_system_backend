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
const menuCharacteristic_1 = __importDefault(require("./menuCharacteristic"));
const menuGarnish_1 = __importDefault(require("./menuGarnish"));
const menuIngredient_1 = __importDefault(require("./menuIngredient"));
const price_1 = __importDefault(require("./price"));
const Menu = connection_1.default.define('menus', {
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
customer_1.default.hasMany(Menu, { foreignKey: 'idCustomer' });
Menu.belongsTo(customer_1.default, { foreignKey: 'idCustomer' });
Menu.belongsToMany(Menu, {
    through: menuGarnish_1.default,
    foreignKey: 'idGarnish',
    otherKey: 'idMenu',
    as: 'menusOfGarnish'
});
Menu.belongsToMany(Menu, {
    through: menuGarnish_1.default,
    foreignKey: 'idMenu',
    otherKey: 'idGarnish',
    as: 'garnishes'
});
Menu.hasMany(price_1.default, { foreignKey: 'idMenu' });
Menu.belongsToMany(ingredient_1.default, {
    through: menuIngredient_1.default,
    foreignKey: 'idMenu',
    otherKey: 'idIngredient'
});
ingredient_1.default.belongsToMany(Menu, {
    through: menuIngredient_1.default,
    foreignKey: 'idIngredient',
    otherKey: 'idMenu'
});
Menu.belongsToMany(characteristic_1.default, {
    through: menuCharacteristic_1.default,
    foreignKey: 'idMenu',
    otherKey: 'idCharacteristic'
});
characteristic_1.default.belongsToMany(Menu, { through: menuCharacteristic_1.default, foreignKey: 'idMenu' });
exports.default = Menu;
//# sourceMappingURL=menu.js.map