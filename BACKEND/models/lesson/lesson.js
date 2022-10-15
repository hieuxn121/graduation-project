import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance';

const Lesson = sequelize.define(
    'Lesson',
    {
        lesson_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        course_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        lesson_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lesson_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lesson_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        video_link: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        pdf_file_link: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        tableName: 'lesson',
        underscored: true,
        timestamps: false,
    }
);

export default Lesson;
