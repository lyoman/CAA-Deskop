// link page two and the index page
//but the page two will be a pop up page
const remote = require('electron').remote
const main = remote.require('./index.js')//or main.js

var button = document.createElement('button')
button.textContent = 'Open Window'
button.addEventListener('click', () => {
	//closing the other window
	var window = remote.getCurrentWindow()
	main.openWindow('index')//link to pagetwo.html
	window.close()
}, false)
document.body.appendChild(button)