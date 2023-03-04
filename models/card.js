const cardlist = require('../card-contents.json');
const config = require('../config/config.json');

function sortById (a,b) {
    if (a.id > b.id) { return 1 }
    if (a.id < b.id) { return -1 }
    return 0;
}

function sortByStrategy (a,b) {
    if (config.categories.indexOf(a.strategy) > config.categories.indexOf(b.strategy)) { return 1 } 
    if (config.categories.indexOf(a.strategy) < config.categories.indexOf(b.strategy)) { return -1 }
    return 0;
}

function sortByType (a,b) {
    if (a.type > b.type ) {return -1}
    if (a.type < b.type ) {return 1};
    return 0;
}

function sortbyStrategyTypeId (a,b) {
    if (sortByStrategy(a,b) == 0) {
        if (sortByType(a,b) == 0) {
            return sortById(a,b);
        } else {
            return sortByType(a,b);
        }
    } else {
        return sortByStrategy(a,b);
    }
}


function sortByTypeId (a,b) {
    if (a.type < b.type) { return 1 }
    else if (a.type > b.type) { return -1 } 
    else {
        if (a.id > b.id) { return 1}
        if (a.id < b.id) { return -1}
    }
    return 0;
}

exports.findById = (id) => {
    return cardlist.find( el => el.id === id)
};

exports.findPrevious = (id) => {
    const cards = [...cardlist].filter( el => (el.status == "active" && el.type == "card"));
    cards.sortbyStrategyTypeId;
    const index = cards.findIndex( el => el.id == id);
    if (index > 0) {
        return cards[index-1];
    } 
    return cards[cards.length-1];
}

exports.findNext = (id) => {
    const cards = [...cardlist].filter( el => (el.status == "active" && el.type == "card"));
    cards.sortbyStrategyTypeId;
    const index = cards.findIndex( el => el.id == id);
    if ((index >= 0) && (index < (cards.length-1))) {
        return cards[index+1];
    } 
    return cards[0];
}

exports.findAll = () => {
    const activeCards = [...cardlist].filter( el => el.status == "active");
    return activeCards.sort(sortbyStrategyTypeId);
};

exports.findAllSortedById = () => {
    const cards = [...cardlist].filter( el => (el.status == "active" && el.type == "card"));
    return cards.sort(sortById);
};

exports.findByStrategy = (strategy) => {
    const cards = [...cardlist].filter( el => (el.status == "active" && el.strategy == strategy));
    return cards.sort(sortByTypeId);
};

exports.findArchived = () => {
    const activeCards = [...cardlist].filter( el => el.status == "archived");
    return activeCards.sort(sortById);
};


