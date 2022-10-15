import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance';

const Assignment = sequelize.define(
    'Assignment',
    {
        assignment_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        lession_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deadline: {
            type: DataTypes.TIME,
            allowNull: false
        },
        attached_file: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'assignment',
        underscored: true,
        timestamps: false,
    }
);

export default Assignment;
