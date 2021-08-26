"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Customer = connection_1.default.define('customers', {
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
    phone: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null
    }
});
exports.default = Customer;
//# sourceMappingURL=customer.js.map