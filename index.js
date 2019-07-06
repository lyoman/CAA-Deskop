'use strict';

const electron = require('electron')
const {app, BrowserWindow} = electron

require('electron-reload')(__dirname);

app.on('ready', () => {
	let win = new BrowserWindow({width:1000, height:800, frame:false})
	win.loadURL(`file://${__dirname}/login.html`)
})


// Creating a new window code
exports.openWindow = (filename) => {
	// win.currentOpenWindow().close
	let win = new BrowserWindow({width:800, height:600, frame:false})
	win.loadURL(`file://${__dirname}/` + filename + `.html`)
}