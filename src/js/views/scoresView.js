import {elements, elementsStrings} from './base';

export const renderActivePlayer= () => {
    elements.player0.classList.toggle(elementsStrings.activeClass);
    elements.player1.classList.toggle(elementsStrings.activeClass);
}