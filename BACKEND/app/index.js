const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Express' });
});

router.get('*', (req, res) => {
    res.render('index', { title: 'Express' });
});

export default router;