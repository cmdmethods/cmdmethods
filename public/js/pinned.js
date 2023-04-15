const pins = document.querySelectorAll('.card .pin');
const littleNumber = document.querySelector('#pinned-number');

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

function showOrMovePinnedCards() {
    const page = document.querySelector('main').id;
    const cards = document.querySelectorAll('.card');
    const pinned = JSON.parse(localStorage.getItem('pinned'));
    const pinnedSection = document.getElementById('pinned-cards');
    cards.forEach((card) => {
        switch (page) {
            case 'strategy':
                // if card is pinned, move it to top
                if (pinned.indexOf(card.id) >= 0) {
                    pinnedSection?.append(card);
                }
                break;
            case 'home':
                // if card is pinned, move it to top
                if (pinned.indexOf(card.id) >= 0) {
                    pinnedSection?.append(card);
                }
                break;
            case 'pinned':
                // if card is NOT pinned, hide it
                if (pinned.indexOf(card.id) < 0) {
                    card.classList.add('hidden');
                }
                break;
            default:
                // do nothing
                break;
            }
    });
}

function animateLittleNumber() {
    document.querySelector('#flying-pin').remove();
    updateLittleNumber();
    littleNumber.classList.add('grow');
    littleNumber.addEventListener('animationend', () => {
        littleNumber.classList.remove('grow');
    });
}

function fly() {
    const pin = document.querySelector('#flying-pin');
    pin.classList.add('fly');
    setTimeout(animateLittleNumber, 600);
}

function animatePin(startX, startY) {
    const pin = document.createElement('img');
    pin.src = '/img/pin.png';
    pin.id = 'flying-pin';
    pin.style.width = 32;
    pin.style.right = `calc(100vw - ${startX}px)`;
    pin.style.top = `${startY}px`;
    document.body.appendChild(pin);
    // tiny delay is necessary to start transition :(
    setTimeout(fly, 1);
}

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

function handlePinClick(event) {
    updateLocalStorage(this.parentElement.id);
    this.classList.toggle('pinned');
    animatePin(event.clientX, event.clientY);
}

function init() {
    createLocalStorage();
    updateAppearancePinnedCards();
    updateLittleNumber();
    showOrMovePinnedCards();
}

// handle click events on pins on cards
if (pins) {
    pins.forEach((pin) => pin.addEventListener('click', handlePinClick));
}
init();
