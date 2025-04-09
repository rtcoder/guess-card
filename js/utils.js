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
