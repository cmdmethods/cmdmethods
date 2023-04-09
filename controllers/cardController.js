const arrify = require('array-back');
const Card = require('../models/card');
const config = require('../config/config.json');

exports.getCards = (req, res, next) => {
    let cards;
    if (!req.query.sort || req.query.sort === 'strategy') {
        cards = Card.findAll();
    } else {
        cards = Card.findAllSortedById();
    }
    if (cards.length > 0) {
        res.render('home', { strategy: 'home', cardlist: cards });
    } else {
        next();
    }
};

exports.getCardsByStrategy = (req, res, next) => {
    const cards = Card.findByStrategy(req.params.strategy);
    if (cards.length > 0) {
        res.render('strategy', {
            strategy: req.params.strategy,
            cardlist: cards,
        });
    } else {
        next();
    }
};

exports.getCardById = (req, res, next) => {
    const card = Card.findById(req.params.id);
    const previousCard = Card.findPrevious(req.params.id);
    const nextCard = Card.findNext(req.params.id);
    if (card) {
        res.render('carddetails', {
            strategy: req.params.strategy,
            card,
            previousCard,
            nextCard,
        });
    } else {
        next();
    }
};

exports.filterCards = (req, res) => {
    const cards = Card.findByFilters(
        req.query.search || '',
        arrify(req.query.dimension),
        arrify(req.query.strategy)
    );
    res.render('filter-results', {
        strategy: '',
        cardlist: cards,
        query: req.query,
    });
};

exports.getFilterNumbers = (req, res) => {
    const filterNumbers = {};
    const filteredCards = Card.findByFilters(
        req.query.search || '',
        arrify(req.query.dimension),
        arrify(req.query.strategy)
    );
    filterNumbers.total = filteredCards.length;
    config.categories.forEach((strategy) => {
        filterNumbers[strategy] = Card.filterByStrategy(
            filteredCards,
            strategy
        ).length;
    });
    config.dimensions.forEach((dimension) => {
        filterNumbers[dimension] = Card.filterByDimension(
            filteredCards,
            dimension
        ).length;
    });
    res.json(filterNumbers);
};
