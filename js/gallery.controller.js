'use strict';



function renderGallery() {
  var strHTML = '';
  strHTML += gImgs.map((img) => {
    return `<img src="./img/square/${img.id}.jpg" onclick="onImgSelect(${img.id})"alt="">`;
  }).join('');
  var elGallery = document.querySelector('.main-gallery');
  elGallery.innerHTML = strHTML;
}

function onImgSelect(imgId) {
  setImg(imgId);
}

function onChangeColor(color) {
  gMeme.lines[0].color = color;
  console.log(gMeme);
  console.log(color);
  renderMeme();
}



const memesSentences = [
  'I never eat falafel',
  'DOMS DOMS EVERYWHERE',
  'Stop Using i in for loops',
  'Armed in knowledge',
  'Js error "Unexpected String"',
  'One does not simply write js',
  'I`m a simple man i see vanilla JS, i click like!',
  'JS, HTML,CSS?? Even my momma can do that',
  'May the force be with you',
  'I know JS',
  'JS Where everything is made up and the rules dont matter',
  'Not sure if im good at programming or good at googling',
  'But if we could',
  'JS what is this?',
  'Write hello world , add to cv 7 years experienced',
];