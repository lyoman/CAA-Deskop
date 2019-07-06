$(document).ready(function(){
   var baseUrl = 'http://mycaa.caa.ac.zw/';

  

    $("button").click(function(e){
       // get values from html
       var username = document.getElementById('userName').value 
       var password = document.getElementById('password').value
        var url = baseUrl + 'login/token.php?username=' + username + '&password='+ password + '&service=moodle_mobile_app'
           
           $.getJSON(url, function(result){
                   var tok = result.token;
                   if(result.error){
                    alert("Username and password does not match, Please Try again")
                    location.reload();
                   } else{

                    const electron = require('electron')
                    const path = require('path')
                    const BrowserWindow = electron.remote.BrowserWindow
                    const remote = require('electron').remote

                    var token = localStorage.setItem("token", tok)
                    

                    var window = remote.getCurrentWindow()
                    const modalPath = path.join('file://',__dirname, 'index.html')
                    let win = new BrowserWindow({width:1500, height:800,transparent:true,alwaysOnTop:false, frame:true})
                    win.on('close', function(){win = null})
                    win.loadURL(modalPath)
                    win.show()
                    window.close()
                   }         
        });
   });
});