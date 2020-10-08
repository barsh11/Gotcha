export default class Round{
    constructor(currPlayer=0, hasFlippedCard=false, currCards, firstCard=-1, secondCard=-1,  lockBoard=false, currScore=0){
        this.currCards= currCards;
        this.currPlayer= currPlayer;
        this.hasFlippedCard= hasFlippedCard;
        this.firstCard= firstCard;
        this.secondCard= secondCard;
        this.lockBoard= lockBoard;
        this.currScore= currScore;
    }
    flipCards(card){
        // First card to flip for this round
        if(!this.hasFlippedCard){
            this.hasFlippedCard= true;
            this.firstCard= card;
            console.log(`flipCards: first card is: ${this.firstCard.dataset.cardnum}`);
        } else{
            this.hasFlippedCard= false;
            this.secondCard= card;
            console.log(`flipCards: second card is: ${this.secondCard.dataset.cardnum}`);
            return this.cardsMatch();
        }
    }
    cardsMatch(){
        // if match
        if(this.firstCard.dataset.cardnum === this.secondCard.dataset.cardnum){
            console.log('cardsMatch: cards datasets match');
            return true;
        }
       
        console.log('cardsMatch: cards datasets does not match');
        return false;
    }
    removeCards(){
        // remove cards from currCards property
        let indexFirst, indexSecond;
        console.log(`removeCards: the original array is: ${this.currCards}`);
        let val= parseInt(this.firstCard.dataset.cardnum);
        console.log(`removeCards: value to remove: ${val}`);
        indexFirst= this.currCards.indexOf(val);
        this.currCards.splice(indexFirst, 1);
        indexSecond= this.currCards.indexOf(val);
        this.currCards.splice(indexSecond, 1);
        console.log('removeCards: removed firstCard from board');
        console.log('removeCards: removed secondCard from board');
        console.log(`removeCards: the new array is: ${this.currCards}`);
    }
}