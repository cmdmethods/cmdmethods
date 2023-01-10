const express = require('express')
const router = express.Router()
const config = require('../config/config.json')


router.get('/', function (req, res) {
    res.render('home', {cardlist: req.cardlist});
})


module.exports = router;
