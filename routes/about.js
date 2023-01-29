const express = require('express')
const router = express.Router()
const config = require('../config/config.json')


router.get('/', function (req, res) {
    res.render('about', {strategy: ''});
});
router.get('/more-info', function (req,res){
    res.render('moreInfo',  {strategy: ''});
});


module.exports = router;
