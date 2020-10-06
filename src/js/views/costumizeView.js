import { elementStrings } from '../../../../../Udemy Courses/The Complete JavaScript Course/Forkify/src/js/views/base';
import {elements, elementsStrings} from './base';

const changeArrow= (linkNum, arrowState) => {
    const icon= document.querySelector(`.costume__link--${linkNum} > ${elementsStrings.dropIcon}`);
    arrowState== 'up' ? icon.innerHTML=icon.innerHTML.replace('chevron-small-down', 'chevron-small-up') : icon.innerHTML=icon.innerHTML.replace('chevron-small-up', 'chevron-small-down');
}

export const dropContent= (link, linkNum) => {
    let markup;
    if (!link.classList.contains('dropped')){
        // If content is not shown
        if (linkNum===1){
            markup=`
                <div class="costume__personalize">
                    <label for="photo" class="h3-heading">choose photos: </label>
                    <input type="file" name="photo" accept="image/*" multiple class="input__field--browse">
                    <div class="costume__thumbnails">
                    </div>
                    <btn type="submit" class="btn-submit">
                        <svg class="btn-submit__icon">
                            <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                        </svg>
                    </btn>
                </div>
                `;
        } else if (linkNum===2){
            markup=`
            <div class="costume__random">
                <label for="numPhotos" class="h3-heading">choose number of photos: </label>
                <input type="number" name="numPhotos" class="input__field--num" value="7">
                <btn type="submit" class="btn-submit">
                    <svg class="btn-submit__icon">
                        <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                    </svg>
                </btn>
            </div>
            `;
        }
        // Insert content
        link.insertAdjacentHTML('afterend', markup);
        // Change arrow
        changeArrow(linkNum, 'up');
        // Indicate content is now shown
        link.classList.add('dropped');
    } else{
        // If content is shown
        // Remove content
        if (linkNum===1){
            document.querySelector('.costume__personalize').remove();
        } else if (linkNum===2){
            document.querySelector('.costume__random').remove();
        }
        link.classList.remove('dropped');
        // Change arrow
        changeArrow(linkNum, 'down');
    }
}