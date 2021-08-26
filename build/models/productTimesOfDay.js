"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const ProductTimeOfDay = connection_1.default.define('products_times_of_day', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProduct: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    },
    idTimeOfDay: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    }
});
exports.default = ProductTimeOfDay;
//# sourceMappingURL=productTimesOfDay.js.map