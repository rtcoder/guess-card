import {allCards, GAME} from './consts.js';
import {getCardNames, hide, renderCards, show, shuffle} from './utils.js';

export function resetGame() {
    GAME.currentBit = 0;
    GAME.answerBits = 0;
    GAME.cardMap = {};

    GAME.selectedCards = shuffle([...allCards])
        .slice(0, 20)
        .map((card, i) => {
            const value = {
                name: card,
                binaryValue: i + 1,
            };
            GAME.cardMap[value.binaryValue] = value;
            return value;
        });

    render(getCardNames(GAME.selectedCards));
}

function render(cards) {
    renderCards(cards, GAME.cardsDiv);
}

export function showNextGroup() {
    const bit = 1 << GAME.currentBit;
    const groupCards = GAME.selectedCards.filter((card) => (card.binaryValue & bit) !== 0);
    const group = getCardNames(groupCards);
    const selectedCardsNames = getCardNames(GAME.selectedCards);

    const availableExtras = allCards.filter((c) => !selectedCardsNames.includes(c));
    const shuffledExtras = shuffle(availableExtras);
    const extras = shuffledExtras.slice(0, 14 - group.length);

    const combined = shuffle([...group, ...extras]);

    render(combined);
}

export function answer(isYes) {
    if (isYes) GAME.answerBits += 1 << GAME.currentBit;
    GAME.currentBit++;

    if (GAME.currentBit >= GAME.maxBits) {
        revealCard();
    } else {
        showNextGroup();
    }
}

function revealCard() {
    hide(GAME.buttonYes, GAME.buttonNo);
    show(GAME.buttonReset);

    const card = GAME.cardMap[GAME.answerBits];

    if (card) {
        render([card.name]);
    } else {
        alert('brak');
    }
}
