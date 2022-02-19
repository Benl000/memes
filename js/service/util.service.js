'use strict';
const ID_STORAGE_KEY = 'last ID';

function _saveLastIdx(gId) {
    saveToStorage(ID_STORAGE_KEY, gId);
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getRandomColor(){
    const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor
}