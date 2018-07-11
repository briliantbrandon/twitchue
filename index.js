const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const childProcess = require('child_process')


function createAPI() {
	process = childProcess.fork('./app/api.js')
	return process
}

function createWindow() {
	win = new BrowserWindow({width: 800, height: 600})

	win.loadURL(url.format({
		pathname: path.join(__dirname, '/gui/index.html'),
		protocol: 'file:',
		slashes: true
	}))
}

api = createAPI();
app.on('ready', createWindow);

app.on('window-all-closed', function(){
	console.log("Killing API");
	api.kill('SIGINT');
	app.exit(0);
});