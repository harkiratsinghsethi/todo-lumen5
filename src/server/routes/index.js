const express = require('express');
// const config = require('../config/config');

const router = express.Router();
router.get('*', (req, res) => {
    res.render('index', {
        title: 'test',
        environmentName: 'test'
    });
});

module.exports = router;
