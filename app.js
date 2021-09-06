const electron = require('electron');
const {app, BrowserWindow, Tray} = electron;
const url = require('url')
const path = require('path');
const { Notification} = require('electron');

let version = "1.0.0"

let shownotification = true;
let showloadingscreen = true;

let loadingWindow

app.on('ready', function(){
 //Console Checks

 console.log('|FiveX-Console-Logs|')
 console.log(`Vesion: ${version}\nNotification Status: ${shownotification}\nLoading Status: ${showloadingscreen}`)

    //loading screen
    loadingWindow = new BrowserWindow({ 
        maxWidth: 402,
        maxHeight: 404,
        minWidth: 370,
        minHeight: 404,
        width: 370, 
        height: 404,
        frame: false,
        show: false,
        transparent: true,
        icon: 'logo.png'
    });

    loadingWindow.setMenuBarVisibility(null)
    loadingWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'loadingscreen.html'),
        protocol: 'file:',
        slashes: true
    }));

    loadingWindow.once('ready-to-show', () => {
        if (showloadingscreen == true) {
            loadingWindow.show()
            setTimeout(Loaded, 3200)

        } else {

        }
    })



    loadingWindow.on('closed', function() {
        app.quit
    });

    loadingWindow.on('session-end', function() {
        app.quit
    });
    

    //Info Window
    infowindow = new BrowserWindow({ 
        icon: 'logo.png',
        show: false,
        maxWidth: 1000,
        maxHeight: 820,
        minWidth: 1000,
        minHeight: 820,
        titleBarStyle: 'hidden',
        width:1000,
        height:820,
    });

     

    infowindow.setMenuBarVisibility(null)
    infowindow.loadURL(url.format({
        pathname: path.join(__dirname, 'fivemwindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    infowindow.on('closed', function() {
        app.quit
    });

    infowindow.on('session-end', function() {
        app.quit
    });


   //end of loading 

    function Loaded() {
        loadingWindow.close();
        infowindow.show()
        notificationchecks()
    }

    function notificationchecks() {
        if (shownotification == true) {
            showNotification()
        } else {
         console.log(`Notifications are Disabled`)
        }
    }

   //Infomation on load notification 
    function showNotification () {
      const notification = {
            title: 'Fivex',
            body: 'Version checks complete',
            icon: path.join(__dirname, 'logo.png')
        }

        if (Notification.permission === "granted") {
            showNotification()
          } else if (Notification.permission === "denied") {
            Notification.requestPermission()
          }

          app.setAppUserModelId(`Current Version:${version}`);

        new Notification(notification).show()
    }

    
    
});

app.on('window-all-closed', () => {
    app.quit()
})

