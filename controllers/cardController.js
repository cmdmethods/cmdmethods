const arrify = require('array-back');
const Card = require('../models/card');
const config = require('../config/config.json');

/** *****************************************************************************
 * HOME
 * get all cards including strategy description cards
 * default sorting is fist by strategy, then alphabetical
 * render page with "home" view
 ******************************************************************************* */

exports.getCards = (req, res, next) => {
    let cards;
    if (!req.query.sort || req.query.sort === 'strategy') {
        cards = Card.findAll();
    } else {
        cards = Card.findAllSortedById();
    }
    if (cards.length > 0) {
        res.render('home', {
            strategy: 'home',
            cardlist: cards,
            query: { dimension: [], strategy: [] },
        });
    } else {
        next();
    }
};

/** *****************************************************************************
 * STRATEGY
 * get cards of strategy that is defined in url
 * including strategy description card
 * sorting is alphabetical
 * render page with "strategy" view
 ******************************************************************************* */

exports.getCardsByStrategy = (req, res, next) => {
    const cards = Card.findByStrategy(req.params.strategy);
    if (cards.length > 0) {
        res.render('strategy', {
            strategy: req.params.strategy,
            cardlist: cards,
            query: { dimension: [], strategy: [] },
        });
    } else {
        next();
    }
};

/** *****************************************************************************
 * CARD DETAILS
 * get details of card with card-id that is defined in url
 * also look up previous and next card to show as kind of carrousel
 * render page with "carddetails" view
 ******************************************************************************* */

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
            query: { dimension: [], strategy: [] },
        });
    } else {
        next();
    }
};

/** *****************************************************************************
 * FILTERED CARDS
 * get cards that comply with filters and sort them alphabetically
 * render page with "filter-results" view
 ******************************************************************************* */

exports.filterCards = (req, res) => {
    req.query.dimension = arrify(req.query.dimension);
    req.query.strategy = arrify(req.query.strategy);
    const cards = Card.findByFilters(
        req.query.search || '',
        req.query.dimension,
        req.query.strategy
    );
    console.log(req.query);
    res.render('filter-results', {
        strategy: '',
        cardlist: cards,
        query: req.query,
    });
};

/** *****************************************************************************
 * GET PINNED CARDS
 * return alle cards sorted alphabetically, excluding strategy description cards
 * a frontend js file will determine which cards are pinned and stored in local
 * storage
 * render page with "pinned" view
 ******************************************************************************* */

exports.getPinnedCards = (req, res) => {
    const cards = Card.findAllSortedById();
    res.render('pinned', {
        strategy: '',
        cardlist: cards,
        query: { dimension: [], strategy: [] },
    });
};

/** *****************************************************************************
 * FILTER NUMBERS
 * return json containing the number of cards in each strategy and dimension
 * the json data can be used by frontend js to dynamically update filter numbers
 * in filter form
 ******************************************************************************* */

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
