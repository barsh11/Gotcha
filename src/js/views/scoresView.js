import {elements, elementsStrings} from './base';

export const renderActivePlayer= ( currplayer => {
    elements.player0.classList.toggle(elementsStrings.activeClass);
    elements.player1.classList.toggle(elementsStrings.activeClass);

});

export const renderFinalScore= ( (player, score) => {
    document.querySelector(`#score-${player}`).textContent= score;
});

export const renderCurrentScore= ( (player, score) => {
    document.querySelector(`#current-${player}`).textContent= score;
});

export const renderWinner= (gotchaCard, winner) => {
    gotchaCard.classList.add('card__winner');
    let heading= document.createElement('h2');
    if (winner===0){
        heading.textContent=`yay! it\'s a tie`;
    } else{
    heading.textContent=`player ${winner} won!`;
    }
    heading.classList.add('h2-heading');
    setTimeout(() => {gotchaCard.insertAdjacentElement('afterbegin', heading);}, 1000);
}
