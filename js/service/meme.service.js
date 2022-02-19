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
}, {
    id: 11,
    url: './img/square/11.jpg',
    keywords: ['politics', 'funny']
}, {
    id: 12,
    url: './img/square/12.jpg',
    keywords: ['politics', 'funny']
}, {
    id: 13,
    url: './img/square/13.jpg',
    keywords: ['politics', 'funny']
}, {
    id: 14,
    url: './img/square/14.jpg',
    keywords: ['politics', 'funny']
}, {
    id: 15,
    url: './img/square/15.jpg',
    keywords: ['politics', 'funny']
}, {
    id: 16,
    url: './img/square/16.jpg',
    keywords: ['politics', 'funny']
}, {
    id: 17,
    url: './img/square/17.jpg',
    keywords: ['politics', 'funny']
}, {
    id: 18,
    url: './img/square/18.jpg',
    keywords: ['politics', 'funny']
}];

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 30,
        font: 'Impact',
        color: 'white',
        stroke: 'black',
        pos: { x: 10, y: 30 },
        isDrag: false
    }]
};


/////////////////
// Meme editor //
/////////////////


function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;
}

function getImgForDisplay(imgId) {
    return gImgs.find(img => imgId === img.id);
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
    renderMeme();
}

function drawText(x, y, line) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillText(line.txt, x, y);
    gCtx.strokeText(line.txt, x, y);
}


////////////////////
// Editor buttons //
////////////////////


function setLineTxt(elBtn) {
    var newTxt = elBtn.value;
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt;
    renderMeme();
}

function setFontSize(txtChange) {
    switch (txtChange) {
        case 'increase':
            gMeme.lines[gMeme.selectedLineIdx].size += 2;
            renderMeme();
            break;
        case 'decrease':
            gMeme.lines[gMeme.selectedLineIdx].size -= 2;
            renderMeme();
            break;
    }
}

function setLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx <= (gMeme.lines.length - 2)) ? ++gMeme.selectedLineIdx : 0;
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
    return gMeme.lines[gMeme.selectedLineIdx];
}

function setNewLine() {
    if (gMeme.lines.length === 0) { pushNewLine(10, 30); }
    else if (gMeme.lines.length === 1) { pushNewLine(10, 280); }
    else { pushNewLine(10, 30 * gMeme.lines.length); }

    function pushNewLine(width, height) {

        gMeme.lines.push({
            txt: '',
            size: 30,
            font: 'Impact',
            color: 'white',
            stroke: 'black',
            pos: { x: width, y: height },
            isDrag: false
        });
    }

    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    document.getElementById("text-input").value = gMeme.lines[gMeme.selectedLineIdx].txt;
}

function setDeleteLine() {
    if (gMeme.lines.length <= 1) return;
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.lines.length <= gMeme.selectedLineIdx) gMeme.selectedLineIdx = gMeme.lines.length - 1;

}

function memeDownload(elBtn) {
    const data = gCanvas.toDataURL('image/jpeg');
    elBtn.href = data;
}


/////////////
// Storage //
/////////////


const STORAGE_KEY = 'SavedMemesDB';
var gSavedMemes = [];

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes);
}

function saveMeme() {
    const savedMeme = gCanvas.toDataURL();
    gSavedMemes.unshift(savedMeme);
    _saveMemeToStorage();
}

function renderSavedMemes() {
    var saveMemes = loadFromStorage(STORAGE_KEY);
    if (!saveMemes || !saveMemes.length) saveMemes = [];
    gSavedMemes = saveMemes;
    _saveMemeToStorage();
}

function getSavedMemes() {
    return gSavedMemes;
}