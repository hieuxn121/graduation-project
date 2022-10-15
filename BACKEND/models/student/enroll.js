import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance';

const Enroll = sequelize.define(
    'Enroll',
    {
        enroll_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        course_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
    },
    {
        tableName: 'enroll',
        underscored: true,
        timestamps: false,
    }
);

export default Enroll;
