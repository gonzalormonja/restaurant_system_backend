"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('restaurant_system', 'restaurant', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
    // logging: false
});
db.query('SET SESSION time_zone = "+00:00";');
exports.default = db;
//# sourceMappingURL=connection.js.map