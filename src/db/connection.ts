import { Sequelize } from 'sequelize';

const db = new Sequelize('restaurant_system', 'restaurant', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  // logging: false
});

export default db;
