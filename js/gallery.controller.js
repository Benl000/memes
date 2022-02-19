'use strict';



function renderGallery() {
  const imgs =getImgs()
  var strHTML = '';
  strHTML += imgs.map((img) => {
    return `<a href="#main-header"><img src="./img/square/${img.id}.jpg" onclick="onImgSelect(${img.id},'imgGallery')" alt="meme-image"></a>`;
  }).join('');
  var elGallery = document.querySelector('.main-gallery');
  elGallery.innerHTML = strHTML;
}

function onImgSelect(imgId, src) {
  setImg(imgId,src);
}

function renderSavedMemesGallery() {
  renderSavedMemes();
  const savedMemes = getSavedMemes();
  var strHTML = savedMemes.map((savedMeme,idx) => {
    return `<img src="${savedMeme}" onclick="onImgSelect(${idx},'imgUrl')" alt="saved-meme">`;
  }).join('');
  var elMemeGallery = document.querySelector('.savedMemes-gallery');
  elMemeGallery.innerHTML = strHTML;
}
