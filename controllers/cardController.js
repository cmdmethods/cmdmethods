const Card = require('../models/card');


exports.getCards = (req, res, next) => {
    let cards;
    if (!req.query.sort || req.query.sort == 'strategy') {
        cards = Card.findAll();
    } else {
        cards = Card.findAllSortedById();
    }
    if (cards.length > 0) {
        res.render('home', {strategy: 'home', cardlist: cards});
    } else {
        next();
    }
};

exports.getCardsByStrategy = (req, res, next) => {
    const cards = Card.findByStrategy(req.params.strategy);
    if (cards.length > 0) {
        res.render('strategy', {strategy: req.params.strategy, cardlist: cards});
    } else {
        next();
    }
};

exports.getCardById = (req, res, next) => {
    const card = Card.findById( req.params.id);
    if (card) {
        res.render('carddetails', {strategy: req.params.strategy, card});
    } else {
        next();
    }
}
