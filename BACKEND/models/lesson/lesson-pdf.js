import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance';

const LessonPdf = sequelize.define(
    'LessonPdf',
    {
        pdf_file_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        lesson_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        pdf_file: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'lesson_pdf',
        underscored: true,
        timestamps: false,
    }
);

export default LessonPdf;
