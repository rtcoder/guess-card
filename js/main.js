import {getCardDiv, getCardNames, hide, show, shuffle, sleep} from './utils.js';

const allCards = [
    '2c', '2d', '2h', '2s', '3c', '3d', '3h', '3s',
    '4c', '4d', '4h', '4s', '5c', '5d', '5h', '5s',
    '6c', '6d', '6h', '6s', '7c', '7d', '7h', '7s',
    '8c', '8d', '8h', '8s', '9c', '9d', '9h', '9s',
    '10c', '10d', '10h', '10s', 'ac', 'ad', 'ah', 'as',
    'jc', 'jd', 'jh', 'js', 'kc', 'kd', 'kh', 'ks',
    'qc', 'qd', 'qh', 'qs',
];

let selectedCards = [];
let cardMap = {};
let currentBit = 0;
let answerBits = 0;
const maxBits = 5;

const cardsDiv = document.querySelector('.card-fan');
const buttonStart = document.querySelector('.buttons button.start');
const buttonYes = document.querySelector('.buttons button.yes');
const buttonNo = document.querySelector('.buttons button.no');
const buttonReset = document.querySelector('.buttons button.reset');

buttonStart.onclick = () => {
    show(buttonYes, buttonNo);
    hide(buttonReset, buttonStart);

    showNextGroup();
};

buttonYes.onclick = () => answer(true);
buttonNo.onclick = () => answer(false);

buttonReset.onclick = () => {
    hide(buttonReset);
    show(buttonStart);

    resetGame();
};

function resetGame() {
    currentBit = 0;
    answerBits = 0;
    cardMap = {};

    selectedCards = shuffle([...allCards])
        .slice(0, 20)
        .map((card, i) => {
            const value = {
                name: card,
                binaryValue: i + 1,
            };
            cardMap[value.binaryValue] = value;
            return value;
        });

    renderCards(getCardNames(selectedCards));
}

async function renderCards(pool) {
    console.log(pool);
    cardsDiv.classList.add('collapsed');
    cardsDiv.style.setProperty('--count', pool.length);
    await sleep(300);
    cardsDiv.innerHTML = pool.map((card, idx) => getCardDiv(idx, card)).join('');
    await sleep(30);
    cardsDiv.classList.remove('collapsed');
}

function showNextGroup() {
    const bit = 1 << currentBit;
    const groupCards = selectedCards.filter((card) => (card.binaryValue & bit) !== 0);
    const group = getCardNames(groupCards);
    const selectedCardsNames = getCardNames(selectedCards);

    const availableExtras = allCards.filter((c) => !selectedCardsNames.includes(c));
    const shuffledExtras = shuffle(availableExtras);
    const extras = shuffledExtras.slice(0, 14 - group.length);

    const combined = shuffle([...group, ...extras]);

    renderCards(combined);
}

function answer(isYes) {
    if (isYes) answerBits += 1 << currentBit;
    currentBit++;

    if (currentBit >= maxBits) {
        revealCard();
    } else {
        showNextGroup();
    }
}

function revealCard() {
    const card = cardMap[answerBits];

    if (card) {
        alert(card.name);
        renderCards([card.name]);
    } else {
        alert('brak');
    }
}

resetGame();
