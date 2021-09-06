const { ipcRenderer } = require('electron')
const { exists } = require('original-fs')
const ipc = ipcRenderer


exit.addEventListener('click', ()=> {
    ipc.send('closeApp')
})