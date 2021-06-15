"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Menu = connection_1.default.define('Menu', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    bar_code: {
        type: sequelize_1.DataTypes.STRING
    },
    short_name: {
        type: sequelize_1.DataTypes.STRING
    },
    idCategory: {
        type: sequelize_1.DataTypes.INTEGER
    },
    idSubCategory: {
        type: sequelize_1.DataTypes.INTEGER
    },
    maximum_of_flavors: {
        type: sequelize_1.DataTypes.INTEGER
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Menu;
//# sourceMappingURL=categories.js.map