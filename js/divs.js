import {GAME} from './consts.js';
import {answer, resetGame, showNextGroup} from './game.js';
import {hide, q, show} from './utils.js';


export function assignDivs() {
    GAME.cardsDiv = q('.card-fan');
    GAME.buttonStart = q('.buttons button.start');
    GAME.buttonYes = q('.buttons button.yes');
    GAME.buttonNo = q('.buttons button.no');
    GAME.buttonReset = q('.buttons button.reset');
}

export function setListeners() {
    GAME.buttonStart.onclick = () => {
        show(GAME.buttonYes, GAME.buttonNo);
        hide(GAME.buttonReset, GAME.buttonStart);

        showNextGroup();
    };

    GAME.buttonYes.onclick = () => answer(true);
    GAME.buttonNo.onclick = () => answer(false);

    GAME.buttonReset.onclick = () => {
        hide(GAME.buttonReset);
        show(GAME.buttonStart);

        resetGame();
    };
}


