'use strict';

var gCanvas;
var gCtx;

function onInit() {
    renderGallery()
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderMeme();
}

function renderMeme() {
    const meme = getMeme();
    drawImg(meme.selectedImgId);
}

function drawImg(imgId) {
    const currMeme = getMeme();
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText(10, 40, currMeme.lines[0]);
        drawText(10, 150, currMeme.lines[1]);
        drawText(10, 280, currMeme.lines[2]);
    };
    img.src = `${getImgForDisplay(imgId).url}`;
}

function onChangeTxtSize(txtChange) {
    setFontSize(txtChange)
}

function onChangeColorFill(fillColor) {
    changeColorFillTxt(fillColor)
    renderMeme();
}

function onChangeColorStroke(strokeColor){
    changeColorStroke(strokeColor)
    renderMeme();
}

function onSwitchLine(){
    setLine()
}