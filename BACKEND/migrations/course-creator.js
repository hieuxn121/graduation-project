import { DataTypes } from 'sequelize';
import sequelize from './sequelizeInstance';

const CourseCreator = sequelize.define(
    'CourseCreator',
    {
        course_creator_id: {
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
        section_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
    },
    {
        tableName: 'course_creator',
        underscored: true,
        timestamps: false,
    }
);

export default CourseCreator;