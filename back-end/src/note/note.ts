import { Model, DataTypes } from 'sequelize';
import { sequelize }from '../database/database';

export class Note extends Model {
  public id!: number;
  public note!: string;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Note',
  },
);