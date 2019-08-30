
// External Dependencies
const fs = require('fs');
const { ipcRenderer: ipc } = require('electron');
const RLogger = require('../js/util/RLogger');

// Internal Dependencies

// Event listening
ipc.on('start', onStart);

document.addEventListener('beforeunload', onBeforeUnload);
document.addEventListener("keypress", onKeyUp);

// Local fields
let config = null;
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
let paused = false;

let xp = 0;
let yp = 0;

// Renderer entrypoint
async function onStart(event, contents) {
    config = contents.config;

    canvas.width = config.window.bounds.width;
    canvas.height = config.window.bounds.height;
    canvas.style.width = `${config.window.bounds.width}px`;
    canvas.style.height = `${config.window.bounds.height}px`;
    canvas.style.display = `float`;

    
    document.addEventListener('click', handler);
    document.body.appendChild(canvas);
    requestAnimationFrame(draw);
}

function onKeyUp(event) {
    console.log('Got a key event.');
    RLogger.debug(`Got key event ${event.keycode}.`);
    if(event.keycode === 'space') {
    }
}
function handler(e) {
    e = e || window.event;
    xp = e.pageX;
    yp = e.pageY;
}

function draw(time) {
    // context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.fillStyle = '#aaaaaa';
    context.fillRect(xp, yp, 64, 64);
    requestAnimationFrame(draw);
}

function onBeforeUnload() {

}