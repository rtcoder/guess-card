const figures = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'a', 'j', 'k', 'q'];
const colors = ['c', 'd', 'h', 's'];
const allCards = [];

figures.forEach(f => {
    colors.forEach(c => {
        allCards.push(`${f}${c}`);
    });
});

const GAME = {
    selectedCards: [],
    cardMap: {},
    currentBit: 0,
    answerBits: 0,
    maxBits: 5,
};


export {allCards, GAME};
