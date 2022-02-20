'use strict';


//////////
// Vars //
//////////


var gCanvas = document.getElementById('my-canvas');
var gCtx = gCanvas.getContext('2d');
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];


/////////////
// On Init //
/////////////


renderGallery();
renderSavedMemesGallery();
addListeners();
renderMeme();


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
    } else if (currMeme.selectedImgSrc === 'imgUrl') {
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

function onChangeColor(strokeColor,filler) {
    changeColor(strokeColor,filler);
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
    gCanvas.addEventListener('mouseleave', onLeave);
    gCanvas.addEventListener('mouseover', onOver);
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove);
    gCanvas.addEventListener('touchstart', onDown);
    gCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    const meme = getMeme();
    const lines = meme.lines;
    lines.forEach(line => {
        if (!isTxtClicked(ev, line)) return;
        document.body.style.cursor = 'grabbing';
        line.isDrag = true;
        gStartPos = pos;
    });
}

function onMove(ev) {
    const meme = getMeme();
    const lines = meme.lines;
    lines.forEach(line => {
        if (line.isDrag) {
            const pos = getEvPos(ev);
            const dx = pos.x - gStartPos.x;
            const dy = pos.y - gStartPos.y;
            moveTxt(dx, dy, line);
            gStartPos = pos;
            renderMeme();
        }
    });
}

function onUp() {
    document.body.style.cursor = 'grab';
    const meme = getMeme();
    const lines = meme.lines;
    lines.forEach(line => { line.isDrag = false; });
}

function onOver() {
    document.body.style.cursor = 'grab';
}

function onLeave() {
    document.body.style.cursor = 'default';
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

function moveTxt(dx, dy, line) {
    line.pos.x += dx;
    line.pos.y += dy;
}

function isTxtClicked(ev, line) {
    return (ev.offsetX >= line.pos.x &&
        ev.offsetX <= (line.pos.x + gCtx.measureText(line.txt).width)
        && ev.offsetY >= line.pos.y - line.size
        && ev.offsetY <= line.pos.y);
}
