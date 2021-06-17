"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const customer_1 = __importDefault(require("./customer"));
const Ingredient = connection_1.default.define('ingredients', {
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
    unit_of_measure: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null
    },
    idCustomer: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    }
});
customer_1.default.hasMany(Ingredient, { foreignKey: 'idCustomer' });
Ingredient.belongsTo(customer_1.default, { foreignKey: 'idCustomer' });
exports.default = Ingredient;
//# sourceMappingURL=ingredient.js.map