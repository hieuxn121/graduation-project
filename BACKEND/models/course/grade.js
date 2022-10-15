import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance';

const Grade = sequelize.define(
    'Grade',
    {
        grade: {
            type: DataTypes.CHAR,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'grade',
        underscored: true,
        timestamps: false,
    }
);

export default Grade;
