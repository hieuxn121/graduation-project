const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'local';
// eslint-disable-next-line import/no-dynamic-require

const sequelize = new Sequelize(
  'postgres://postgres:hieund121@localhost:5432/postgres',
);

export default sequelize;
