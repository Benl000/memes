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
        drawText(20, 40, currMeme.lines[0]);
        drawText(20, 150, currMeme.lines[1]);
        drawText(20, 280, currMeme.lines[2]);
    };
    img.src = `${getImgForDisplay(imgId).url}`;
}

function drawText(x, y, line) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'brown';
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px Arial`;
    gCtx.fillText(line.txt, x, y);
    gCtx.strokeText(line.txt, x, y);
}


function changeTxtSize(txtChange) {
    setFontSize(txtChange)
}

function switchLine(){
    setLine()
}