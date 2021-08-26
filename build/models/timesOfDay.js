"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const customer_1 = __importDefault(require("./customer"));
const TimeOfDay = connection_1.default.define('times_of_day', {
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
    hour_start: {
        type: sequelize_1.DataTypes.TIME,
        validate: {
            notEmpty: true
        }
    },
    hour_end: {
        type: sequelize_1.DataTypes.TIME,
        validate: {
            notEmpty: true
        }
    },
    idCustomer: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    }
}, { freezeTableName: true });
customer_1.default.hasMany(TimeOfDay, { foreignKey: 'idCustomer' });
TimeOfDay.belongsTo(customer_1.default, { foreignKey: 'idCustomer' });
exports.default = TimeOfDay;
//# sourceMappingURL=timesOfDay.js.map