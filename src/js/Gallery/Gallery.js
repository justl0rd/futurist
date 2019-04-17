export default function Gallery() {
    const leftButton = document.querySelector('.gallery__button_left'),
        rightButton = document.querySelector('.gallery__button_right');

    leftButton.addEventListener('click', leftButtonHandler);
    rightButton.addEventListener('click', rightButtonHandler);
}

function leftButtonHandler() {
    const image = document.querySelector('.gallery__image');
    let newImageIndex = getCurrentImageIndex(image.src) - 1;
    
    if (newImageIndex < galleryParams.firstImageIndex) {
        newImageIndex = galleryParams.lastImageIndex;
    }

    image.src = getNewSrc(image.src, newImageIndex);
}

function rightButtonHandler() {
    const image = document.querySelector('.gallery__image');
    let newImageIndex = getCurrentImageIndex(image.src) + 1;
    
    if (newImageIndex > galleryParams.lastImageIndex) {
        newImageIndex = galleryParams.firstImageIndex;
    }

    image.src = getNewSrc(image.src, newImageIndex);
}

function getCurrentImageIndex(src) {
    const index = src.search(/[0-9]+.jpg/gm);
    return +src[index];
}

function getNewSrc(src, newIndex) {
    return src.replace(/[0-9]+.jpg/gm, `${newIndex}.jpg`);
};

// gallery params
const galleryParams = {
    firstImageIndex: 1,
    lastImageIndex: 4
}