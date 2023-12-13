import { Model, DataTypes } from 'sequelize';
import { sequelize }from '../database/database';

export class Note extends Model {
  public id!: number;
  public note!: string;
}

Note.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const value = this.getDataValue('note');
      return value ? JSON.parse(value) : null;
    },
    set(val) {
      this.setDataValue('note', val ? JSON.stringify(val) : null);
    }
  },
}, {
  sequelize,
  modelName: 'Note',
});