import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance';

const StudentCourseDetail = sequelize.define(
    'StudentCourseDetail',
    {
        enroll_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        grade: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        grade_details: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
    },
    {
        tableName: 'student_course_detail',
        underscored: true,
        timestamps: false,
    }
);

export default StudentCourseDetail;
