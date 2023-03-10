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
    const cards = cardlist.filter( el => (el.status == "active" && el.type == "card"));
    cards.sortbyStrategyTypeId;
    const index = cards.findIndex( el => el.id == id);
    if (index > 0) {
        return cards[index-1];
    } 
    return cards[cards.length-1];
}

exports.findNext = (id) => {
    const cards = cardlist.filter( el => (el.status == "active" && el.type == "card"));
    cards.sortbyStrategyTypeId;
    const index = cards.findIndex( el => el.id == id);
    if ((index >= 0) && (index < (cards.length-1))) {
        return cards[index+1];
    } 
    return cards[0];
}

exports.findAll = () => {
    const cards = cardlist.filter( el => el.status == "active");
    return cards.sort(sortbyStrategyTypeId);
};

exports.findAllCards = () => {
    const cards = [...cardlist].filter( el => (el.status == "active" && el.type == "card"));
    return cards.sort(sortById);
}

exports.findAllSortedById = () => {
    const cards = [...cardlist].filter( el => (el.status == "active" && el.type == "card"));
    return cards.sort(sortById);
};

exports.findByStrategy = (strategy) => {
    const cards = [...cardlist].filter( el => (el.status == "active" && el.strategy == strategy));
    return cards.sort(sortByTypeId);
};

exports.findByStrategies = (strategies) => {
    let totalCards = [];
    strategies.forEach( strategy => {
        const filteredCards =  [...cardlist].filter( el => (
            el.status == "active" && el.strategy == strategy && el.type=="card"
        ));
        totalCards = [...totalCards, ...filteredCards];
    })
    return totalCards.sort(sortByTypeId);
};

exports.findArchived = () => {
    const activeCards = [...cardlist].filter( el => el.status == "archived");
    return activeCards.sort(sortById);
};

exports.filterBySearchString = (cards, searchString) => {
    return [...cards].filter( (el)  => {
        if (el.name.toLowerCase().includes(searchString.toLowerCase())) {return 1}
        if (el.why.toLowerCase().includes(searchString.toLowerCase())) {return 1}
        if (el.how.toLowerCase().includes(searchString.toLowerCase())) {return 1}
        if (el.in_practice.toLowerCase().includes(searchString.toLowerCase())) {return 1}
        for (let i=0; i<el.ingredients.length; i++) {
            if (el.ingredients[i].toLowerCase().includes(searchString.toLowerCase())) { 
                return 1;
            }
        }
        return 0;
    });
};

exports.filterByDimension  = (cards, dimension) => {
    return [...cards].filter( card => {
        if (card.sliders) {
            if (dimension == "inspiration") {
                if (card.sliders.inspiration_data < 50) { return 1 }
            }
            if (dimension == "data") {
                if (card.sliders.inspiration_data > 50) { return 1 }
            }
            if (dimension == "expertise") {
                if (card.sliders.expertise_fit < 50) { return 1 }
            }
            if (dimension == "fit") {
                if (card.sliders.expertise_fit > 50) { return 1 }
            }
            if (dimension == "overview") {
                if (card.sliders.overview_certainty < 50) { return 1 }
            }
            if (dimension == "certainty") {
                if (card.sliders.overview_certainty > 50) { return 1 }
            }
        }
       return 0;
    })
}

exports.filterByStrategy = (cards, strategy) => {
    return [...cards].filter( card => card.strategy == strategy );
}

exports.findByFilters = (searchString, filterDimensions, filterStrategies) => {
    let totalCards = [];
    let filteredByStrategy = [];

    if (filterStrategies.length == 0) {
        filteredByStrategy =  this.findAllCards();
    } else {
        filteredByStrategy =  this.findByStrategies(filterStrategies)
    }
    if (filterDimensions.length == 0) {
        totalCards = [...filteredByStrategy];
    } else {
        filterDimensions.forEach( dimension => {
            totalCards = this.filterByDimension(filteredByStrategy, dimension);
        })
    }
    if (searchString != '') {
        totalCards = this.filterBySearchString(totalCards, searchString)
    }
    return totalCards.sort(sortById);
}




