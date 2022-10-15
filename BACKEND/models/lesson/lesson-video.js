import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance';

const LessonVideo = sequelize.define(
    'LessonVideo',
    {
        video_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        lesson_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        video_file: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'lesson_video',
        underscored: true,
        timestamps: false,
    }
);

export default LessonVideo;
