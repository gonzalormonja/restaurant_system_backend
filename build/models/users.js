"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const customer_1 = __importDefault(require("./customer"));
const types_1 = __importDefault(require("./types"));
const User = connection_1.default.define('users', {
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
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    idCustomer: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    },
    idType: {
        type: sequelize_1.DataTypes.INTEGER,
        validate: {
            notEmpty: true
        }
    }
});
customer_1.default.hasMany(User, { foreignKey: 'idCustomer' });
User.belongsTo(customer_1.default, { foreignKey: 'idCustomer' });
types_1.default.hasMany(User, { foreignKey: 'idType' });
User.belongsTo(types_1.default, { foreignKey: 'idType' });
exports.default = User;
//# sourceMappingURL=users.js.map