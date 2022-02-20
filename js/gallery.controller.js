'use strict';


//////////////////////
// Render Galleries //
//////////////////////


function renderGallery() {
  const imgs =getImgs()
  var strHTML = '';
  strHTML += imgs.map((img) => {
    return `<a href="#main-header"><img src="./img/square/${img.id}.jpg" onclick="onImgSelect(${img.id},'imgGallery')" alt="meme-image"></a>`;
  }).join('');
  var elGallery = document.querySelector('.main-gallery');
  elGallery.innerHTML = strHTML;
}

function renderSavedMemesGallery() {
  renderSavedMemes();
  const savedMemes = getSavedMemes();
  var strHTML = savedMemes.map((savedMeme,idx) => {
    return `<img src="${savedMeme.url}" onclick="onImgSelect(${idx},'imgUrl')" alt="saved-meme">`;
  }).join('');
  var elMemeGallery = document.querySelector('.savedMemes-gallery');
  elMemeGallery.innerHTML = strHTML;
}

function onImgSelect(memeIdx, src) {
  setImg(memeIdx,src);
}


//////////////////////////
// Toggle Saved Gallery //
//////////////////////////


function onToggleSavedMemes(){
  var savedMemesGallery = document.querySelector('.savedMemes-gallery');
  if (savedMemesGallery.style.display === "none") {
    savedMemesGallery.style.display = "grid";
  } else {
    savedMemesGallery.style.display = "none";
  }
}