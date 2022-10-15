import express from 'express';
import Teacher from '../../controllers/teacher';
const router = express.Router();
const DEFAULT_VERSION = 'v1';

const teacherRoutes = () => {
    router.get('/', Teacher.getAllTeacher);
    return router;
}

export function registerTeacherRoutes(app) {
    app.use(
        `/api/${process.env.API_VERSION || DEFAULT_VERSION}/teachers`,
        teacherRoutes(),
    );
}

