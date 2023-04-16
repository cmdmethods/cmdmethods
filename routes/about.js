const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('about', { 
        strategy: '',
        query: {'dimension':[], 'strategy':[]} 
    });
});
router.get('/more-info', (req, res) => {
    res.render('moreInfo', { 
        strategy: '',
        query: {'dimension':[], 'strategy':[]} 
    });
});

module.exports = router;
