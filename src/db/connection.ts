import { Sequelize } from 'sequelize';

const db = new Sequelize('restaurant_system', 'restaurant', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
  // logging: false
});

db.query('SET SESSION time_zone = "+00:00";');

export default db;
