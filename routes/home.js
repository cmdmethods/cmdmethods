const express = require('express')
const router = express.Router()
const config = require('../config/config.json')


router.get('/', function (req, res) {
    console.log(req.cardlist.length)
    res.render('home', {cardlist: req.cardlist});
})


module.exports = router;
