"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const ProductGarnish = connection_1.default.define('products_garnishes', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProduct: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null
    },
    idGarnish: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null
    },
    max_quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    }
});
exports.default = ProductGarnish;
//# sourceMappingURL=productGarnish.js.map