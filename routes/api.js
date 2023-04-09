const express = require('express');

const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/filter-numbers', cardController.getFilterNumbers);

router.use((req, res) => {
    res.status(404).json({
        error: {
            message: '404 - endpoint not found, check the url of your request',
        },
    });
});

module.exports = router;
