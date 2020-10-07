import {elements, elementsStrings} from './base';

const changeArrow= (linkNum, arrowState) => {
    const icon= document.querySelector(`.costume__link--${linkNum} > ${elementsStrings.dropIcon}`);
    arrowState== 'up' ? icon.innerHTML=icon.innerHTML.replace('chevron-small-down', 'chevron-small-up') : icon.innerHTML=icon.innerHTML.replace('chevron-small-up', 'chevron-small-down');
}

// Handles display when there are images in object:
/*const determineMarkup= state => {

}*/

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
                        <div class="costume__wrapper--1"></div>
                        <div class="costume__wrapper--2"></div>
                        <div class="costume__wrapper--3"></div>
                        <div class="costume__wrapper--4"></div>
                        <div class="costume__wrapper--5"></div>
                        <div class="costume__wrapper--6"></div>
                        <div class="costume__wrapper--7"></div>
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
                <input type="number" name="numPhotos" class="input__field--num" value="7" max="7">
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

export const renderThumbs= files => {
    for (let i=0; i<files.length; i++){
        const img= document.createElement('img');
        img.src=URL.createObjectURL(files[i]);
        img.onload= () => {
            URL.revokeObjectURL(img.src);
        } // what is it for?
        img.classList.add(`costume__thumbnail`, `costume__thumbnails--${i+1}`);
        img.file=files[i];
        const thumb=document.querySelector(`.costume__wrapper--${i+1}`);
        thumb.appendChild(img);
    }
}