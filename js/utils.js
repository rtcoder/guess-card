import {elements} from './divs.js';

export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function hide(...els) {
    els.forEach(el => el.setAttribute('hidden', ''));
}

export function show(...els) {
    els.forEach(el => el.removeAttribute('hidden'));
}

export function getCardDiv(idx, card) {
    return `<div class="card" style="--i: ${idx}"><img src="./img/${card}.png" alt=""/></div>`;
}

export function getCardNames(cards) {
    return cards.map(card => card.name);
}

export function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

export async function render(cards) {
    elements.cardsDiv.classList.add('collapsed');
    elements.cardsDiv.style.setProperty('--count', cards.length);
    await sleep(300);
    elements.cardsDiv.innerHTML = cards.map((card, idx) => getCardDiv(idx, card)).join('');
    await sleep(30);
    elements.cardsDiv.classList.remove('collapsed');
}

export function q(selector) {
    return document.querySelector(selector);
}
