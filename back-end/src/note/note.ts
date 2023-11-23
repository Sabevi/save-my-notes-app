import { Model, DataTypes } from 'sequelize';
import { sequelize }from '../database/database';

export class Note extends Model {}

Note.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Note',
});