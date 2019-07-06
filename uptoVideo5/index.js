const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('ready', () => {
	let win = new BrowserWindow({width:800, height:600})
	win.loadURL(`file://${__dirname}/index.html`)
})


// Creating a new window code
exports.openWindow = (filename) => {
	// win.currentOpenWindow().close
	let win = new BrowserWindow({width:800, height:600})
	win.loadURL(`file://${__dirname}/` + filename + `.html`)
}