"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const menu_1 = __importDefault(require("./menu"));
const Category = connection_1.default.define('categories', {
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
    idCategory: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
});
Category.belongsTo(Category, { foreignKey: 'idCategory' });
Category.hasMany(menu_1.default, {
    foreignKey: 'idCategory'
});
menu_1.default.belongsTo(Category, { foreignKey: 'idCategory' });
exports.default = Category;
//# sourceMappingURL=category.js.map