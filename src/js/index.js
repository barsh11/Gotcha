
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
import {elements} from './views/base';

const state={};

//** COSTUMIZE CONTROLLER */
const controlCostumize= async() => {
    
};

elements.costumeCards.addEventListener('click', e => {
    // 1) when this section is clicked:    
    e.preventDefault();
    // 1.1) rendrer HTML in UI
    costumizeView.dropContent(elements.costumeCards, 1);
    // 2) when files are chosen:
    // 2.1) generate thumbnails on UI
    // 3) when submit btn is clicked:
    // 3.1) store images
    // 3.2) images will be stored in array
});
elements.randomCards.addEventListener('click', e =>{
    // 1) when this section is clicked:
    e.preventDefault();
    // 1.1) render HTML on UI
    costumizeView.dropContent(elements.randomCards, 2);
    // 2) when submit btn is clicked:
    // 2.1) generate and store photos from photos' API
    // 2.2) images will be stored in array
});


