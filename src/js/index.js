import Costumize from './models/Costumize';
import * as costumizeView from './views/costumizeView';
import Round from './models/Round';
import * as roundView from './views/roundView';
import Scores from './models/Scores';
import * as scoresView from './views/scoresView';
import {elements} from './views/base';

const state={};

/** COSTUMIZE CONTROLLER */
// functionality of costume images is prevented until fixed
// and it is marked as comments here.
elements.costumeCards.addEventListener('click', e => {
    // 1) when this section is clicked:    
    e.preventDefault();
    // 1.1) rendrer HTML in UI
    costumizeView.dropContent(elements.costumeCards, 1);
    // 2) when files are chosen:
    /*state.costumize= new Costumize();
    const inputImgs= document.querySelector('.input__field--browse');
    inputImgs.addEventListener('change', inputImgsE => {
        state.costumize.getFiles(inputImgs.files);
        // 2.1) generate thumbnails on UI
        if (state.costumize.files){
            costumizeView.renderThumbs(state.costumize.files);
            
            // 3) when submit btn is clicked:
            const submitImgs= document.querySelector('.costume__personalize > .btn-submit');
            submitImgs.addEventListener('click', submitImgsE => {
            // 3.1) store images node list in costumize object
            // state.costumize.getThumbs(state.costumize.files);
            // 3.2) auto close the menu on costumize bar.
            costumizeView.dropContent(elements.costumeCards, 1);
            // 4) generate board
             const currCards= state.costumize.generateCostumize(state.costumize.images);
            // start game
             controlGame(0, currCards);
        });
             }
    , false);*/
});

elements.randomCards.addEventListener('click', e =>{
    // 1) when this section is clicked:
    e.preventDefault();
    // 1.1) render HTML on UI
    costumizeView.dropContent(elements.randomCards, 2);
    // 2) recieve number op photos from user
    const inputNum= document.querySelector('.input__field--num');
    // 3) when submit btn is clicked:
    const submitNum= document.querySelector('.costume__random > .btn-submit');
    state.costumize= new Costumize();
    submitNum.addEventListener('click', submitNumE => {
        // 3.1) determine number of photos
        const num=inputNum.value;
        if(num <8 && num >0){
            // 3.2) auto close the menu on costumize bar.
            costumizeView.dropContent(elements.randomCards, 2);
            // 4) generate board
            const currCards= state.costumize.generateRandom(num);
            // start game
            initGame(undefined, currCards);
        } else{
            alert('You can choose 1 - 7 photos. Please try again.');
        }
    });
});

/** GAME CONTROLLER */
const newBtn= elements.btnNew;
newBtn.addEventListener('click', () => {location.reload();}, true);

const initGame= (player=0, currCards) => {
    state.scores= new Scores();
    // init final scores
    state.scores.final= [0,0];
    // init final scores in UI
    scoresView.renderFinalScore(0, state.scores.final[0]);
    scoresView.renderFinalScore(1, state.scores.final[1]);
    initRound(player, currCards);
}

const initRound= (player, currCards) => {
    
    controlRound(player, currCards);
};

const passTurn= () => {
    // sum final score
    state.scores.final[state.round.currPlayer]= state.scores.final[state.round.currPlayer] + state.round.currScore;
    // show final score in UI
    scoresView.renderFinalScore(state.round.currPlayer, state.scores.final[state.round.currPlayer]);
    console.log('passTurn: final score updated');
    // init current score
    state.round.currScore= 0;
    // show current score UI
    scoresView.renderCurrentScore(state.round.currPlayer, state.round.currScore);
    console.log('passTurn: current score updated');
    if(state.round.currCards.length!=1){
        // next player
        let player;
        state.round.currPlayer===0 ? player=1 : player=0;
        // next player in UI
        scoresView.renderActivePlayer(state.round.currPlayer);
        console.log(`passTurn: turn is passed from: ${state.round.currPlayer} to ${player}`);
        initRound(player, state.round.currCards);
    }
}

const controlRound= (currPlayer, currCards) => {

        const holdBtn= elements.btnHold;
        holdBtn.addEventListener('click', passTurn, true);

        // start a new round
        state.round= new Round(currPlayer, false, currCards, -1, -1, false, 0);
        console.log(state.round);

        // select all cards
        const cards=document.querySelectorAll('.card');

        // if cards matchs
        const removeListener= () => {
            // remove event listeners
            state.round.firstCard.removeEventListener('click', clickHandler, true);
            state.round.secondCard.removeEventListener('click', clickHandler, true);
        }

        // click handler
        const clickHandler= (e) => {
            // choosing closest card to click 
            let card= e.target.closest('.card');
            console.log(`controlGame: the card that was clicked on is:`);
            console.log(card.dataset.cardnum);
            console.log('controlGame: cards are: ');
            console.log(state.round.currCards);
            
            // if the flipping back of the cards that didn't match
            // is not finished:
            if (state.round.checkLockBoard()=== true){
                return;
            }

            // if user clicks twice on the same card:
            if (state.round.checkSameCard(card.id)=== true){
                return;
            }

            // if user clicked on GOTCHA
            if (card.dataset.cardnum==='gotcha'){
                console.log(state.round);
                let isFirst;
                (state.round.hasFlippedCard===false) ? isFirst= true : isFirst= false;
                console.log(isFirst); //testing
                // flip the card
                state.round.flipCards(card);
                console.log('gotcha is now the first card');
                console.log(state.round.firstCard);
                  
                setTimeout(() => {
                    // flip card back in UI   
                    if(isFirst=== true){
                        console.log('gotcha is first');
                        roundView.flipCardsUI(state.round.firstCard); 
                    } else{
                        roundView.flipCardsUI(state.round.secondCard); 
                    }         

                    // clears current score
                    state.round.currScore= 0;
                    
                    // shuffle board
                    console.log('controlGame: cards before shuffle are: ');
                    console.log(`${state.round.currCards}`);
                    state.round.currCards= state.costumize.generateRandom(state.round.currCards.length, state.round.currCards);
                    console.log('controlGame: cards after shuffle are: ');
                    console.log(`${state.round.currCards}`);                    
                    // state.round.lockBoard= false;
                    // passes turn
                    passTurn();
                }, 1500);   
            }

            // in case that is the second click, check if there is a match
            let match= state.round.flipCards(card);
            // flip card in UI
            roundView.flipCardsUI(card);
            if (match===true){
                // add current score + 2
                state.round.currScore= state.round.currScore + 2;
                // show current score in UI
                scoresView.renderCurrentScore(state.round.currPlayer, state.round.currScore);
                // remove cards from currCards property
                state.round.removeCards();
                // remove event listeners
                removeListener();
                // remove cards from UI
                roundView.matchCardsUI(state.round);
                // initiate rounds' cards
                state.round.firstCard=-1;
                state.round.secondCard=-1;
            } else if (match===false && state.round.secondCard!=-1){

                setTimeout( () => {
                    // flip card back in UI
                    roundView.flipCardsUI(state.round.firstCard);
                    roundView.flipCardsUI(state.round.secondCard);
                    passTurn();
                }, 1200);
            }
            if (currCards.length===1){
                passTurn();
                console.log('player 1 score: '+state.scores.final[0]);
                console.log('player 2 score: '+state.scores.final[1]);
                let winner= state.scores.checkWinner() + 1;
                setTimeout(() => {
                    let gotchaCard= document.querySelector('.card__gotcha');
                    roundView.flipCardsUI(gotchaCard);
                    scoresView.renderWinner(gotchaCard, winner);
                }, 2000);
            }
        }
            
        // attach event listener to every card
        cards.forEach(curr => {
            curr.addEventListener('click', clickHandler, true);
        });
}

