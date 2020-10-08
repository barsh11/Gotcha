import {elements} from '../views/base';

function countInArray(array, what) {
    return array.filter(item => item == what).length;
}

function generateRandomNum(num){
    return Math.floor(Math.random()*num);
}

function generateCardsHtml(num){
    let randomNums= [];
    let randNum;
    let i=0;
    while(randomNums.length!==num*2){
        randNum=generateRandomNum(num);
        if(countInArray(randomNums, randNum) < 2){ 
            randomNums[i]=randNum;
            i++;
        }
    }
    
    randomNums.splice(generateRandomNum(num-1), 0, 8);
    
    const board=elements.board;
    for(let i=0; i< randomNums.length; i++){
        let markup;

        if (randomNums[i]!==8){
            markup=`
                <div class="card" id="${i}" data-cardnum="${randomNums[i]}">
                    <div class="card__side card__side--front">
                        <div class="card__picture card__picture--front">
                            &nbsp;
                        </div>
                    </div>
                    <div class="card__side card__side--back">
                        <img src="img/img-${randomNums[i]}.jpeg" alt="Image ${randomNums[i]}" class="card__picture card__picture--${randomNums[i]}">    
                    </div>
                </div>
            `;
        } else{
            markup=`
                <div class="card card__gotcha" id="${i}" data-cardNum="gotcha">
                    <div class="card__side card__side--front">
                        <div class="card__picture card__picture--front">
                            &nbsp;
                        </div>
                    </div>
                    <div class="card__side card__side--back">
                        <svg class="card__picture card__picture--gotcha">
                            <use xlink:href="img/sprite.svg#icon-refresh"></use>
                        </svg> 
                </div>
            `;
        }
        
        board.insertAdjacentHTML('beforeend', markup);
    }

    return randomNums;
}

export default class Costumize{
    constructor(){
    }
    // This function gets a files list coming from the input filed changea and store them in a property.
    getFiles(files){
        // We assume the user uploads all the images at once
        if(files.length <8){
            this.files=files;
        } else{
            alert('You can choose up to 7 photos. Please choose again.');
        }
    }
    // This function selects all thumbnails imgs generated by renderThumbs and store them in a property.
    getThumbs(files){
        const imgs= document.querySelectorAll('.costume__thumbnail');
        this.images=imgs;
    }
    generateCostumize(images){
        const currCards= generateCardsHtml(images.length);
        return currCards;
    }
    generateRandom(num){
        const currCards= generateCardsHtml(num);
        return currCards;
    }
}