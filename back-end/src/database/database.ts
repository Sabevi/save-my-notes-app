import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('database', 'user', 'pass', {
  dialect: 'sqlite',
  storage: './src/database/database.sqlite',
});