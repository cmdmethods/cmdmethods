const pins = document.querySelectorAll('.card .pin');

function updateLittleNumber() {
    const pinned = JSON.parse(localStorage.getItem('pinned'));
    document.querySelector('#pinned-number').innerHTML = pinned.length;
}

function animateLittleNumber() {
    document.querySelector('#flying-pin').remove();
    updateLittleNumber();
    const littleNumber = document.querySelector('#pinned-number');
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
    // create local storage if it doesn't exist yet
    if (!localStorage.getItem('pinned')) {
        localStorage.setItem('pinned', JSON.stringify([]));
    }
    const pinned = JSON.parse(localStorage.getItem('pinned'));
    // for pins that were already pinned in past, change appearance
    pins.forEach((pin) => {
        if (pinned.indexOf(pin.parentElement.id) >= 0) {
            pin.classList.add('pinned');
        }
    });
    updateLittleNumber();
}

// handle click events on pins on cards
if (pins) {
    pins.forEach((pin) => pin.addEventListener('click', handlePinClick));
}

init();
