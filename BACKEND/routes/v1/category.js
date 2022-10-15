import express from 'express';
import Category from '../../controllers/category';
const router = express.Router();
const DEFAULT_VERSION = 'v1';

const categoryRoutes = () => {
    router.get('/', Category.getAllCategory);
    return router;
}

export function registerCategoryRoutes(app) {
    app.use(
        `/api/${process.env.API_VERSION || DEFAULT_VERSION}/categories`,
        categoryRoutes(),
    );
}

