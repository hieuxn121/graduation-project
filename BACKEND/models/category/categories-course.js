import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance.js';

const CategoriesCourse = sequelize.define(
  'CategoriesCourse',
  {
    cate_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    cate_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cate_description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 'categories_course',
    underscored: true,
    timestamps: false,
  })

export default CategoriesCourse;
