export const flipCardsUI= card => {
    // testing- console.log(`flipCardsUI: card flipped: ${card.dataset.cardnum}`);
    card.classList.toggle("card__flipped");
}

export const matchCardsUI= round => {
    round.firstCard.classList.add('card__matched');
    round.secondCard.classList.add('card__matched');

    // in order to be able to see the transition before dissapearence:
    setTimeout( () => {
        organizeBoard();
        round.lockBoard= false;
    }, 2000);
}

const organizeBoard= () => {
    // remove cards from HTML
    let cards=document.querySelectorAll('.card__matched');
    cards.forEach(card => card.remove());
}