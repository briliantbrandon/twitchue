const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');
const childProcess = require('child_process');
const hue = require('node-hue-api');

const store = new Store({defaults: {hueUser: '', bridgeIP: '', websocketToken: ''}});
const api = createAPI();
let window;

function createAPI() {
	process = childProcess.fork('./app/api.js');
	var hueParms = {hueUser: store.get('hueUser'), bridgeIP: store.get('bridgeIP')};
	return process;
}

function getParams() {
	let params = {	hueUser: store.get('hueUser'),
					bridgeIP: store.get('bridgeIP'),
					websocketToken: store.get('websocketToken')};
	return params;
}

// Search for an available bridge and store it for later use. Then call to load the setup page.
function beginSetup() {
	hue.nupnpSearch().then((bridge) => {
		store.set('bridgeIP', bridge[0].ipaddress);
	}).then(createSetupWindow).done();
}

// Loads the setup page which prompts for the user to press the button on the bridge to create a user 
// and then will prompt the user for a streamlabs websocket key.
function createSetupWindow() {
	window = new BrowserWindow({width: 800, height: 600});

	window.loadURL(url.format({
		pathname: path.join(__dirname, '/gui/setup/index.html'),
		protocol: 'file:',
		slashes: true
	}));
}

// Reaches out to the bridge to register a new user and stores the returned user id
// Need to come up with a method for retrying until button is pressed
// Or need to wait for the render process to confirm that the button was pressed. The latter is probably better
exports.registerUser = function registerUser(targetWindow) {
	tempAPI = new hue.HueApi();
	tempAPI.registerUser(store.get('bridgeIP'), 'Twitchue').then((user) => {
		store.set('hueUser', user);
		targetWindow.webContents.send('userRegistered');
	}).fail((err) => {
		console.log(err);
	}).done();
}

exports.setWebsocketToken = function setWebsocketsKey(targetWindow, key) {
	store.set('websocketToken', key);
	api.send(getParams());
	targetWindow.webContents.send('setupComplete');
}

function createMainWindow() {
	window = new BrowserWindow({width: 800, height: 600});

	window.loadURL(url.format({
		pathname: path.join(__dirname, '/gui/index.html'),
		protocol: 'file:',
		slashes: true
	}));
}

if(store.get('bridgeIP') == '' || store.get('hueUser') == '') {
	app.on('ready', beginSetup);
}

else {
	api.send(getParams());
	app.on('ready', createMainWindow);
}

app.on('window-all-closed', function(){
	console.log("Killing API");
	api.kill('SIGINT');
	app.exit(0);
});