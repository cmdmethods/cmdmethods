const pins = document.querySelectorAll('.card .pin');
const littleNumber = document.querySelector('#pinned-number');
const page = document.querySelector('main').id;

function createLocalStorage() {
    // create local storage if it doesn't exist yet
    if (!localStorage.getItem('pinned')) {
        localStorage.setItem('pinned', JSON.stringify([]));
    }
}

function updateAppearancePinnedCards() {
    const pinned = JSON.parse(localStorage.getItem('pinned'));
    // for pins that were already pinned in past, change appearance
    pins.forEach((pin) => {
        if (pinned.indexOf(pin.parentElement.id) >= 0) {
            pin.classList.add('pinned');
        }
    });
}

function updateLittleNumber() {
    const pinned = JSON.parse(localStorage.getItem('pinned'));
    littleNumber.innerHTML = pinned.length;
}

function getPinnedSection() {
    // search for section for pinned cards
    let pinnedSection = document.getElementById('pinned-cards');
    // if not found, create it
    if (!pinnedSection) {
        pinnedSection = document.createElement('section');
        pinnedSection.id = 'pinned-cards';
        pinnedSection.classList.add('subgrid');
        switch (page) {
            case 'home':
                document.querySelector('section.home').after(pinnedSection);
                break;
            case 'strategy':
                document.getElementById('unpinned-cards').before(pinnedSection);
                break;
            case 'pinned':
                document.getElementById('unpinned-cards').before(pinnedSection);
                break;
            default:
                document.body.prepend(pinnedSection)
                break;
        }
    }
    return pinnedSection;
}

function movePinnedCardsToTop() {
    const cards = document.querySelectorAll('.card');
    const pinned = JSON.parse(localStorage.getItem('pinned'));
    cards.forEach((card) => {
        if (pinned.indexOf(card.id) >= 0) {
            const pinnedSection = getPinnedSection();
            pinnedSection.append(card);
        }
    });
}

function determineAnimation(pinning) {
    if (pinning) {
        switch (page) {
            case 'home':
                return 'go-up';
            case 'strategy':
                return 'go-up';
            default:
                return '';
        }
    } else {
        switch (page) {
            case 'home':
                return 'go-down';
            case 'strategy':
                return 'go-down';
            case 'pinned':
                return 'disappear';
            default:
                return '';
        }
    }
}

function animateCard(cardId, pinning) {
    const card = document.getElementById(cardId);
    const animation = determineAnimation(pinning);
    card.classList.add(animation);
    card.addEventListener('animationend', (e) => {
        card.classList.remove(animation);
        if (pinning) {
            const pinnedSection = getPinnedSection();
            pinnedSection.append(card);
        } else {
            const unpinnedSection = document.getElementById('unpinned-cards');
            unpinnedSection.append(card);
        }
    });
}

function animateLittleNumber() {
    document.querySelector('#flying-pin').remove();
    updateLittleNumber();
    littleNumber.classList.add('grow');
}

function fly() {
    const pin = document.querySelector('#flying-pin');
    pin.classList.add('fly');
}

function startFlying(event, cardID, pinning) {
    // create flying pin element
    const pin = document.createElement('img');
    pin.src = '/img/pin.png';
    pin.id = 'flying-pin';
    pin.style.right = `calc(100vw - ${event.clientX}px)`;
    pin.style.top = `${event.clientY}px`;
    document.body.appendChild(pin);
    // tiny delay is necessary to start transition :(
    setTimeout(fly, 1);
    setTimeout(animateLittleNumber, 600);
    setTimeout(animateCard, 1400, cardID, pinning);
}

// use local storage on client to remember which cards are pinned
function updateLocalStorage(idCard) {
    const pinned = JSON.parse(localStorage.getItem('pinned'));
    const index = pinned.indexOf(idCard);
    if (index >= 0) {
        pinned.splice(index, 1);
    } else {
        pinned.push(idCard);
    }
    localStorage.setItem('pinned', JSON.stringify(pinned));
}

// every time a pin is clicked do the following
function handlePinClick(event) {
    const cardID = event.currentTarget.parentElement.id;
    this.classList.toggle('pinned');
    const pinning = this.classList.contains('pinned');
    updateLocalStorage(cardID);
    startFlying(event, cardID, pinning);
}

// at page load
function init() {
    createLocalStorage();
    updateLittleNumber();
    updateAppearancePinnedCards();
    if (page === 'home' || page === 'strategy' || page === 'pinned') {
        movePinnedCardsToTop();
    }
    littleNumber.addEventListener('animationend', () => {
        littleNumber.classList.remove('grow');
    });
}

// handle click events on pins on cards
if (pins) {
    pins.forEach((pin) => pin.addEventListener('click', handlePinClick));
}

init();