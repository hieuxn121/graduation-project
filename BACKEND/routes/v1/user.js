import express from 'express';
import User from '../../controllers/user';
const router = express.Router();
const DEFAULT_VERSION = 'v1';

const userRoutes = () => {
    router.post('/', User.getUserInfo);
    router.post('/update', User.updateUserInfo);
    return router;
}

export function registerUserRoutes(app) {
    app.use(
        `/api/${process.env.API_VERSION || DEFAULT_VERSION}/user`,
        userRoutes(),
    );
}

