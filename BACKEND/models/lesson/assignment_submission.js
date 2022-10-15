import { DataTypes } from 'sequelize';
import sequelize from '../sequelizeInstance';

const AssignmentSubmission = sequelize.define(
    'AssignmentSubmission',
    {
        asg_submission_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        assignment_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        grade: {
            type: DataTypes.CHAR,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: 'assignment_submission',
        underscored: true,
        timestamps: false,
    }
);

export default AssignmentSubmission;
