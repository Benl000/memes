'use strict';

var gCanvas;
var gCtx;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


function onInit() {
    renderGallery();
    renderSavedMemesGallery();
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners();
    renderMeme();
}

////////////
// Canvas //
////////////

function renderMeme() {
    const meme = getMeme();
    drawImg(meme.selectedImgId);
}

function drawImg(imgId) {
    const currMeme = getMeme();
    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        currMeme.lines.forEach((line) => {
            drawText(line);
        });
    };

    if (currMeme.selectedImgSrc === 'imgGallery') {
        img.src = `${getImgForDisplay(imgId).url}`;
    }else if (currMeme.selectedImgSrc === 'imgUrl'){
        img.src = `${getImgForDisplay(imgId)}`;
    }
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl);

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => { onSuccess(url); })
        .catch((err) => { console.error(err); });
}


////////////////////
// Editor buttons //
////////////////////


function onSaveMeme() {
    saveMeme();
    renderSavedMemesGallery();
}

function onChangeTxtSize(txtChange) {
    setFontSize(txtChange);
}

function onChangeColorFill(fillColor) {
    changeColorFillTxt(fillColor);
    renderMeme();
}

function onChangeColorStroke(strokeColor) {
    changeColorStroke(strokeColor);
    renderMeme();
}

function onSwitchLine() {
    setLine();
    document.getElementById("text-input").value = getCurrLine().txt;
}

function onChangeTxtFont() {
    changeTxtFont();
    renderMeme();
}

function onSetNewLine() {
    setNewLine();
    renderMeme();
}

function onSetDeleteLine() {
    setDeleteLine();
    document.getElementById("text-input").value = gMeme.lines[gMeme.selectedLineIdx].txt;
    renderMeme();
}

function onMemeDownload(elBtn) {
    memeDownload(elBtn);
}

function onShareMeme() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`, '_blank');

    }
    doUploadImg(imgDataUrl, onSuccess);
}

function onRandomMeme() {

    const randomMeme = getMeme();

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
    const memesFont = ['Impact', 'Serif', 'Comic Sans MS', 'Sans-serif'];

    const allImgs = getImgs();
    const randomImg = getRandomIntInclusive(0, allImgs.length - 1);
    const numOfSentences = getRandomIntInclusive(0, 1);
    const randomSentence = memesSentences[getRandomIntInclusive(0, memesSentences.length - 1)];
    const randomTextSize = getRandomIntInclusive(10, 20);
    const randomTextFont = memesFont[getRandomIntInclusive(0, 3)];

    randomMeme.selectedImgId = randomImg;
    randomMeme.lines[0].txt = randomSentence;
    randomMeme.lines[0].size = randomTextSize;
    randomMeme.lines[0].font = randomTextFont;
    randomMeme.lines[0].color = getRandomColor();
    randomMeme.lines[0].stroke = getRandomColor();

    // if (randomMeme.lines[0].txt.width>gCanvas.width) randomMeme.lines[0].size = 10


    if (numOfSentences === 1) {
        gMeme.lines.push({
            txt: '',
            size: 30,
            font: 'Impact',
            color: 'white',
            stroke: 'black',
            pos: { x: 10, y: 280 },
            isDrag: false
        });

        randomMeme.selectedImgId = randomImg;
        randomMeme.lines[1].txt = randomSentence;
        randomMeme.lines[1].size = randomTextSize;
        randomMeme.lines[1].font = randomTextFont;
        randomMeme.lines[1].color = getRandomColor();
        randomMeme.lines[1].stroke = getRandomColor();

    }

    renderMeme();
}

/////////////////
// Drag & Drop //
/////////////////



function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove);
    gCanvas.addEventListener('mousedown', onDown);
    gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove);
    gCanvas.addEventListener('touchstart', onDown);
    gCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isTxtClicked(pos)) return;
    setTxtDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    document.body.style.cursor = 'grab';
    const currLine = getCurrLine();
    if (currLine.isDrag) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        moveTxt(dx, dy);
        gStartPos = pos;
        renderMeme();
    }
}

function onUp() {
    setTxtDrag(false);
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    };
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        };
    }
    return pos;
}

function moveTxt(dx, dy) {
    const currLine = getCurrLine();
    currLine.pos.x += dx;
    currLine.pos.y += dy;
}

function setTxtDrag(isDrag) {
    const currLine = getCurrLine();
    currLine.isDrag = isDrag;
}

function isTxtClicked(clickedPos) {
    const currLine = getCurrLine();
    const { pos } = currLine;
    const { txt } = currLine;
    const txtWidth = gCtx.measureText(txt).width;
    const halftxtWidth = txtWidth / 2;
    const distance = Math.sqrt(((pos.x + halftxtWidth) - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2);
    return distance <= currLine.size;
}

function renderCurrLine() {
    const currLine = getCurrLine();
    drawText(currLine.pos.x, currLine.pos.y, currLine.txt);
}