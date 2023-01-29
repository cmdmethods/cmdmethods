const express = require('express')
const router = express.Router()
const config = require('../config/config.json')


function sortByTypeAndId (a,b) {
    if (a.type < b.type) { return 1 }
    else if (a.type > b.type) { return -1 } 
    else {
        if (a.id > b.id) { return 1}
        if (a.id < b.id) { return -1}
    }
    return 0;
}


router.get('/:strategy', function (req, res) {
    let sortedlist = [...req.cardlist].filter(el => el.status == "active");
    sortedlist = sortedlist.filter(el => el.strategy == req.params.strategy)
    sortedlist = sortedlist.sort(sortByTypeAndId);
    res.render('strategy', {strategy: req.params.strategy, cardlist: sortedlist});
})


module.exports = router;


