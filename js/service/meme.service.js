'use strict';

var gIdx = 1;

var gImgs = [{
    id: 1,
    url: './img/square/1.jpg',
    keywords: ['funny', 'trump']
}, {
    id: 2,
    url: './img/square/2.jpg',
    keywords: ['cute', 'dog']
}, {
    id: 3,
    url: './img/square/3.jpg',
    keywords: ['baby', 'dog']
}, {
    id: 4,
    url: './img/square/4.jpg',
    keywords: ['cute', 'cat']
}, {
    id: 5,
    url: './img/square/5.jpg',
    keywords: ['funny', 'baby']
}, {
    id: 6,
    url: './img/square/6.jpg',
    keywords: ['high', 'funny']
}, {
    id: 7,
    url: './img/square/7.jpg',
    keywords: ['cute', 'baby']
}, {
    id: 8,
    url: './img/square/8.jpg',
    keywords: ['high', 'funny']
}, {
    id: 9,
    url: './img/square/9.jpg',
    keywords: ['baby', 'funny']
}, {
    id: 10,
    url: './img/square/10.jpg',
    keywords: ['politics', 'funny']
}];

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 20,
        align: 'left',
        font: 'Serif',
        color: 'black',
        stroke: 'black'
    }, {
        txt: '',
        size: 20,
        align: 'left',
        font: 'Serif',
        color: 'black',
        stroke: 'black'
    }, {
        txt: '',
        size: 20,
        align: 'left',
        font: 'Serif',
        color: 'black',
        stroke: 'black'
    }]
};

function getMeme() {
    return gMeme;
}

function getImgForDisplay(imgId) {
    return gImgs.find(img => imgId === img.id);
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
    renderMeme();
}

function drawText(x, y, line) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);
    gCtx.focus = "fdgsfgs";
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, x, y);
    gCtx.strokeText(line.txt, x, y);
}

function setLineTxt(elBtn) {
    var newTxt = elBtn.value;
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt;
    renderMeme();
}

function setFontSize(txtChange) {
    switch (txtChange) {
        case 'increase':
            gMeme.lines[gMeme.selectedLineIdx].size += 2;
            console.log(gMeme);
            renderMeme();
            break;
        case 'decrease':
            gMeme.lines[gMeme.selectedLineIdx].size -= 2;
            renderMeme();
            break;
    }
}

function setLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx <= 1) ? ++gMeme.selectedLineIdx : 0;
}

function changeColorFillTxt(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function changeColorStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color;
}

function changeTxtFont() {
    switch (gMeme.lines[gMeme.selectedLineIdx].font) {
        case 'Serif':
            gMeme.lines[gMeme.selectedLineIdx].font = 'Impact';
            break;
        case 'Impact':
            gMeme.lines[gMeme.selectedLineIdx].font = 'Comic Sans MS';
            break;
        case 'Comic Sans MS':
            gMeme.lines[gMeme.selectedLineIdx].font = 'Sans-serif';
            break;
        case 'Sans-serif':
            gMeme.lines[gMeme.selectedLineIdx].font = 'Serif';
            break;
    }
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx].txt;
}