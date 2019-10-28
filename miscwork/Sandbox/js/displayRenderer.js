
// External Dependencies
const fs = require('fs');
const { ipcRenderer: ipc } = require('electron');
const { remote } = require('electron')

// Internal Dependencies
const RLogger = require('../js/util/RLogger');

// Event listening
ipc.on('start', onStart);

document.addEventListener('beforeunload', onBeforeUnload);

// Local fields
let config = null;
let login = null;


// Renderer entrypoint
async function onStart(event, contents) {
    login = new LoginPage(document);
    
}


function onLoadPage(page) {
    switch(page) {
        case 'login':
            remote.getCurrentWindow().loadURL('./');
            break;
        case 'stats':
            break;
        case 'game':
            break;                  
    }

}


function onBeforeUnload() {
    
}