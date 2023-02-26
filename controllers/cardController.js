const Card = require('../models/card');


exports.getCards = (req, res, next) => {
    let cards;
    if (!req.query.sort || req.query.sort == 'strategy') {
        cards = Card.findAll();
    } else {
        cards = Card.findAllSortedById();
    }
    if (cards) {
        res.render('home', {strategy: 'home', cardlist: cards});
    } else {
        next();
    }
};

exports.getCardsByStrategy = (req, res, next) => {
    const cards = Card.findByStrategy(req.params.strategy);
    res.render('strategy', {strategy: req.params.strategy, cardlist: cards});
};
