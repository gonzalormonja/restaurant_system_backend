"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const MenuCharacteristic = connection_1.default.define('menus_characteristics', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idMenu: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null
    },
    idCharacteristic: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: null
    }
});
exports.default = MenuCharacteristic;
//# sourceMappingURL=menuCharacteristic.js.map