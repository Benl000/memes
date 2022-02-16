'use strict';

var gIdx = 1;

var gImgs = [{
    id: 1,
    url: './img/square/2.jpg',
    keywords: ['funny', 'cat']
}];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I sometimes eat Falafel',
        size: 20,
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




// function loadImageFromInput(ev, onImageReady) {
//     var reader = new FileReader()

//     reader.onload = function (event) {
//         console.log('onload');
//         var img = new Image()
//         // Render on canvas
//         img.onload = onImageReady.bind(null, img)
//         img.src = event.target.result
//         gImg = img
//     }
//     console.log('after');
//     reader.readAsDataURL(ev.target.files[0])
// }