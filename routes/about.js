const express = require('express')
const router = express.Router()
const config = require('../config/config.json')


router.get('/', function (req, res) {
    res.render('about');
});
router.get('/more-info', function (req,res){
    res.render('moreInfo');
});


module.exports = router;
