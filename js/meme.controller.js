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
        drawText(40, 40, currMeme.lines[0].txt);
    };
    img.src = `${getImgForDisplay(imgId).url}`;
}

function drawText(x, y, text) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = 'brown';
    gCtx.fillStyle = gMeme.lines[0].color;
    gCtx.font = `${gMeme.lines[0].size}px Arial`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


function changeTxtSize(txtChange) {
    setFontSize(txtChange)
}