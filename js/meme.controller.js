'use strict';

var gCanvas;
var gCtx;

function onInit() {
    renderGallery();
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
        gMeme.lines.forEach((line, i) => {
            if (i === 0) {
                drawText(10, 30, currMeme.lines[i]);
            } else if (i === 1) {
                drawText(10, 280, currMeme.lines[i]);
            } else {drawText(10, (i * 30 + 20), currMeme.lines[i])}
        });
    };
    img.src = `${getImgForDisplay(imgId).url}`;
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
    document.getElementById("text-input").value = getCurrLine();
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

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl);

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url);
        })
        .catch((err) => {
            console.error(err);
        });
}
