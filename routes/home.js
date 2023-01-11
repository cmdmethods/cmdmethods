const express = require('express')
const router = express.Router()
const config = require('../config/config.json')

function sortById (a,b) {
    if (a.id > b.id) {
        return 1;
    }
    if (a.id < b.id) {
        return -1;
    }
    return 0;
}


router.get('/', function (req, res) {
    let sortedlist = [...req.cardlist].filter(el => el.status == "active");
    if (!req.query.sort  || req.query.sort == "alphabetical") {
        sortedlist = sortedlist.sort(sortById);
        sortedlist = sortedlist.filter(el => el.type == "card")
        res.render('home', {cardlist: sortedlist});
    } else {
        res.render('home', {cardlist: sortedlist});
    }
})
router.get('/')


module.exports = router;
