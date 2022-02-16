'use strict';

var gIdx = 1;
var gTxtSize = 20;
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
        txt: 'I sometimes eat Falafel',
        size: gTxtSize,
        align: 'left',
        color: 'red'
    }]
};

function getMeme() {
    return gMeme;
}

function getImgForDisplay(imgId) {
    return gImgs.find(img => imgId === img.id);
}

function setLineTxt(elBtn) {
    var newTxt = elBtn.value;
    gMeme.lines[0].txt = newTxt;
    renderMeme();
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
    renderMeme();
}

function setFontSize(txtChange) {
    switch (txtChange) {
        case 'increase':
            gTxtSize += 2;
            renderMeme();
            console.log(gTxtSize);
            break;
        case 'decrease':
            gTxtSize -= 2;
            console.log(gTxtSize);
            renderMeme();
            break;
    }
}