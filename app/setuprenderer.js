const {remote, ipcRenderer} = require('electron');
const {registerUser, setWebsocketToken} = remote.require('./index');
const currentWindow = remote.getCurrentWindow();

const button = document.querySelector('#form');

function hueButtonPressed() {
    registerUser(currentWindow);
}

function submitWebsocketToken() {
    var token = document.getElementById("token").value;
    setWebsocketToken(currentWindow, token);
}

ipcRenderer.on('userRegistered', function(event) {
    window.location.href = 'websockets.html';
});

ipcRenderer.on('setupComplete', function(event) {
    window.location.href = '../index.html';
})