const express = require('express')
const router = express.Router()
const config = require('../config/config.json')

function sortById (a,b) {
    if (a.id > b.id) { return 1 }
    if (a.id < b.id) { return -1 }
    return 0;
}

function sortByStrategy (a,b) {
    if (config.categories.indexOf(a.strategy) == config.categories.indexOf(b.strategy)) {
        if (a.type < b.type) { return 1 }
        else if (a.type > b.type) { return -1 } 
        else {
            if (a.id > b.id) { return 1}
            if (a.id < b.id) { return -1}
        }
    }
    if (config.categories.indexOf(a.strategy) > config.categories.indexOf(b.strategy)) { return 1 } 
    if (config.categories.indexOf(a.strategy) < config.categories.indexOf(b.strategy)) { return -1 }
    return 0;
}


router.get('/', function (req, res) {
    // filter out only active cards, not archived cards
    let sortedlist = [...req.cardlist].filter(el => el.status == "active");
    sortedlist.forEach(el => console.log(el.id))
    if (!req.query.sort  || req.query.sort == "strategy") {
        // sort cards by strategy
        sortedlist = sortedlist.sort(sortByStrategy);
        res.render('home', {strategy: 'home', cardlist: sortedlist});
    } else {
        // sort cards by cardid
        sortedlist = sortedlist.sort(sortById);
        // filter out only cards, not category descriptions
        sortedlist = sortedlist.filter(el => el.type == "card")
        res.render('home', {strategy: 'home', cardlist: sortedlist});
    }
})
router.get('/')


module.exports = router;
