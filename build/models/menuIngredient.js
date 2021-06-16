"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const MenuIngredient = connection_1.default.define('menus_ingredients', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idMenu: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null
    },
    idIngredient: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null
    },
    quantity: {
        type: sequelize_1.DataTypes.FLOAT,
        validate: {
            notEmpty: true
        }
    }
});
exports.default = MenuIngredient;
//# sourceMappingURL=menuIngredient.js.map