
// External Dependencies
const fs = require('fs');
const { ipcRenderer: ipc } = require('electron');
const RLogger = require('../js/util/RLogger');

// Internal Dependencies
const Logger = require('../js/ui/LoginPage');

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

function onBeforeUnload() {
    
}