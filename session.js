const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://mycaa.caa.ac.zw/')

const ses = win.webContents.session
console.log(ses.getUserAgent())



const {session} = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())