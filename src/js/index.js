import Costumize from './models/Costumize';
import * as costumizeView from './views/costumizeView';
import Round from './models/Round';
import * as roundView from './views/roundView';
import Scores from './models/Scores';
import * as scoresView from './views/scoresView';
import {elements} from './views/base';

const state={};

//** COSTUMIZE CONTROLLER */
elements.costumeCards.addEventListener('click', e => {
    // 1) when this section is clicked:    
    e.preventDefault();
    // 1.1) rendrer HTML in UI
    costumizeView.dropContent(elements.costumeCards, 1);
    // 2) when files are chosen:
    state.costumize= new Costumize();
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
            state.costumize.getThumbs(state.costumize.files);
            // 3.2) auto close the menu on costumize bar.
            costumizeView.dropContent(elements.costumeCards, 1);
            console.log(state.costumize.images); //testing
            console.log(state.costumize.files); //testing
            // 4) generate board
            const currCards= state.costumize.generateCostumize(state.costumize.images);
            // start game
            controlGame(0, currCards);
        });
        }
    }, false);
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
        if(num <8){
            // 3.2) auto close the menu on costumize bar.
            costumizeView.dropContent(elements.randomCards, 2);
            // 4) generate board
            const currCards= state.costumize.generateRandom(num);
            // start game
            controlGame(0, currCards);
        } else{
            alert('You can choose up to 7 photos. Please choose again.');
        }
    });
});

let win=false;

/** GAME CONTROLLER */
const controlGame= (currPlayer, currCards) => {
    
    if(!win){
        let player, updatedCards;

        // start a new round
        state.round=new Round(currPlayer, false, currCards, -1, -1, false, 0);

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
            // if the flipping back of the cards that didn't match
            // is not finished:
            if (state.round.lockBoard===true){
                console.log('board is lock. please click again.');
                return;
            }
            // if user clicks twice on the same card:
            if (card.id===state.round.firstCard.id){ 
                console.log('you chose the same card twice. please click again.');
                return;
            }
            // in case that is the second click, check if there is a match
            let match= state.round.flipCards(card);
            // flip card in UI
            roundView.flipCardsUI(card);
            if (match===true){
                // update current score
                state.round.currScore++;
                // update current score in UI
                scoresView.renderCurrScore(state.round);
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
                state.round.lockBoard= true;
                setTimeout( () => {
                    // flip card back in UI
                    roundView.flipCardsUI(state.round.firstCard);
                    roundView.flipCardsUI(state.round.secondCard);
                    state.round.lockBoard= false;
                    // next player
                    state.round.currPlayer===0 ? player=1 : player=0;
                    // next player in UI
                    scoresView.renderActivePlayer();
                    updatedCards=state.round.currCards;
                    console.log(`controlGame: the updated cards are: ${updatedCards}`);
                    console.log(`controlGame: turn is passed from: ${state.round.currPlayer} to ${player}`);
                    state.round.firstCard=-1;
                    state.round.secondCard=-1;
                }, 1200);
            }
            // to start new round AFTER cards are flipped back
            if (state.round.firstCard===-1 && state.round.secondCard===-1){
                controlGame(player, updatedCards);
            }
        }
            
        // attach event listener to every card
        cards.forEach(curr => {
            curr.addEventListener('click', clickHandler, true);
        });
    }
}

