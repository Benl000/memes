'use strict';



function renderGallery() {
  var strHTML = '';
  strHTML += gImgs.map((img) => {
    return `<a href="#main-header"><img src="./img/square/${img.id}.jpg" onclick="onImgSelect(${img.id})" alt="meme-image"></a>`;
  }).join('');
  var elGallery = document.querySelector('.main-gallery');
  elGallery.innerHTML = strHTML;
}

function onImgSelect(imgId) {
  setImg(imgId);
}

function renderSavedMemesGallery() {
  renderSavedMemes();
  const savedMemes = getSavedMemes();
  var strHTML = savedMemes.map(savedMeme => {
    return `<img src="${savedMeme}" alt="saved-meme">`;
  }).join('');
  var elMemeGallery = document.querySelector('.savedMemes-gallery');
  elMemeGallery.innerHTML = strHTML;
}
