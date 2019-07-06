// In the project i am not using this file
'use strict';

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url  = require('url')

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't , the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 800, height: 600})

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}))
}