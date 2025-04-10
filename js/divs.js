import {answer, resetGame, showNextGroup} from './game.js';
import {hide, q, show} from './utils.js';

export const elements = {
    cardsDiv: null,
    buttons: {
        start: null,
        yes: null,
        no: null,
        reset: null,
    },
    mainTitleHeading: null,
    questionTitleHeading: null,
    answerTitleHeading: null,
};

export function assignDivs() {
    elements.cardsDiv = q('.card-fan');
    elements.buttons.start = q('.buttons button.start');
    elements.buttons.yes = q('.buttons button.yes');
    elements.buttons.no = q('.buttons button.no');
    elements.buttons.reset = q('.buttons button.reset');
    elements.mainTitleHeading = q('h2.main-title');
    elements.questionTitleHeading = q('h2.question-title');
    elements.answerTitleHeading = q('h2.answer-title');
}

export function setListeners() {
    elements.buttons.start.onclick = () => {
        show(elements.buttons.yes, elements.buttons.no, elements.questionTitleHeading);
        hide(elements.buttons.reset, elements.buttons.start, elements.mainTitleHeading, elements.answerTitleHeading);

        showNextGroup();
    };

    elements.buttons.yes.onclick = () => answer(true);
    elements.buttons.no.onclick = () => answer(false);

    elements.buttons.reset.onclick = () => {
        hide(elements.buttons.reset, elements.questionTitleHeading, elements.answerTitleHeading);
        show(elements.buttons.start, elements.mainTitleHeading);

        resetGame();
    };
}


