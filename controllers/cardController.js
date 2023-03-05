const Card = require('../models/card');
const arrify = require('array-back');
const config = require('../config/config.json');



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
    const previousCard = Card.findPrevious( req.params.id);
    const nextCard = Card.findNext( req.params.id);
    if (card) {
        res.render('carddetails', {strategy: req.params.strategy, card, previousCard, nextCard});
    } else {
        next();
    }
}

exports.filterCards = (req, res) => {
    let cards;
    cards = Card.findByFilters(arrify(req.query.dimension) , arrify(req.query.strategy));
    res.render('filter-results', {strategy: '', cardlist: cards});
}

exports.getFilterNumbers = (req, res) => {
    let filterNumbers = {};
    const allCards = Card.findAllCards();
    config.categories.forEach( strategy => {
        filterNumbers[strategy] = allCards.filter( el => (el.strategy == strategy)).length;
    })
    const filterCards = Card.findByFilters(arrify(req.query.dimension) , arrify(req.query.strategy));
    config.dimensions.forEach( dimension => {
        filterNumbers[dimension] = Card.filterByDimension(filterCards, dimension).length;
    })
    filterNumbers['total'] = filterCards.length;
    console.log(filterNumbers);
    res.json(filterNumbers);
}
