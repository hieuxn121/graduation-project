import express from 'express';
import Auth from '../../controllers/auth';
const router = express.Router();
const DEFAULT_VERSION = 'v1';

const authRoutes = () => {
    router.post('/login', Auth.login);
    return router;
}

export function registerAuthRoutes(app) {
    app.use(
        `/api/${process.env.API_VERSION || DEFAULT_VERSION}`,
        authRoutes(),
    );
}

