
// let flipCount;
// in the begining of every round, flipCount=0;
// whenever the user clicks on a card flipCount=flipCount+1;
// if card flipped is card__gotcha:
// mix all cards, currScore=0, pass turn to next player, flipCount=0;
// if card flipped !card__gotach:
// if flipCount==2:
// check if there is a match: 
// if there is a match: currScore++, flipCount=0
// if there is no match: finalScore=finalScore+currScore, pass turn to next player, flipCount=0;

import Costumize from './models/Costumize';
import * as costumizeView from './views/costumizeView';
import Game from './models/Game';
import * as gameView from './views/gameView';
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
            state.costumize.generateCostumize(state.costumize.images);
            // start game
            controlGame();
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
            state.costumize.generateRandom(num);
            // start game
            controlGame();
        } else{
            alert('You can choose up to 7 photos. Please choose again.');
        }
    });
});

/** GAME CONTROLLER */
const controlGame= () => {

}

