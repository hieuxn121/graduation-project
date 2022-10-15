import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance';

const Course = sequelize.define(
    'Course',
    {
        course_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        course_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
        tableName: 'course',
        underscored: true,
        timestamps: false,
    }
);

export default Course;
