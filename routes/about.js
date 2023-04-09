const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('about', { strategy: '' });
});
router.get('/more-info', (req, res) => {
    res.render('moreInfo', { strategy: '' });
});

module.exports = router;
