import express from 'express';
import Course from '../../controllers/course';
import {Lessons} from '../../controllers/lesson';

const router = express.Router();
const DEFAULT_VERSION = 'v1';

const courseRoutes = () => {
    router.post('/', Course.getAllCourses);
    router.post('/create', Course.createNewCourse);
    router.post('/detail', Course.getCourseDetail);
    router.post('/my-courses', Course.getMyCourses);
    router.delete('/:id', Course.deleteCourse);
    
    router.get('/:courseId/lessons', Lessons.getListLessons);
    router.post('/lesson/upload', Lessons.uploadFile);
    router.post('/lesson/uploadFolder', Lessons.createFolder);
    router.get('/lesson/getfile', Lessons.getFile);

    return router;
}

export function registerCourseRoutes(app) {
    app.use(
        `/api/${process.env.API_VERSION || DEFAULT_VERSION}/course`,
        courseRoutes(),
    );
}

