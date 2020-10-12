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
            if(card.dataset.cardnum!= 'gotcha'){
                this.hasFlippedCard= true;
                this.firstCard= card;
            } else{
                this.hasFlippedCard= false;
                this.firstCard= card;
                this.lockBoard= true;
                return;
            }
        } else{
            this.hasFlippedCard= false;
            this.secondCard= card;
            this.lockBoard= true;
            console.log(`flipCards: second card is: ${this.secondCard.dataset.cardnum}`); //testing
            if(card.dataset.cardnum!= 'gotcha'){
                return this.cardsMatch();
            } else{
                console.log(`flipCards: second card is gotcha: ${this.firstCard}`);
                console.log(this.secondCard);
            }
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
    checkLockBoard(){
        if (this.lockBoard=== true){
            console.log('checkLockBoard: board is lock. please click again.');
            return true;
        }

        return false;
    }
    checkSameCard(currId){
        if (currId===this.firstCard.id){ 
            console.log('checkSameCard: you chose the same card twice. please click again.');
            return true;
        }

        return false;
    }
}