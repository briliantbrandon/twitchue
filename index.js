const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const express = require('express')

function createWindow() {
	win = new BrowserWindow({width: 800, height: 600})

	win.loadURL(url.format({
		pathname: path.join(__dirname, '/gui/index.html'),
		protocol: 'file:',
		slashes: true
	}))
}

app.on('ready', createWindow)