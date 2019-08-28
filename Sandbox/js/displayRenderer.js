
// External Dependencies
const fs = require('fs');
const { ipcRenderer: ipc } = require('electron');
const { RLogger } = require('@cgm/loggerutils');

// Internal Dependencies

// Event listening
ipc.on('start', onStart);

document.addEventListener('beforeunload', onBeforeUnload);
document.addEventListener("keypress", onKeyUp);

// Local fields
let config = null;
let video = document.createElement('video');
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
let paused = false;

// Renderer entrypoint
async function onStart(event, contents) {
    config = contents.config;
    
    video.src = 'file:///C:/CGM/Videos/BaccaratDisplay.mp4';
    video.autoplay = true;
    video.loop = true;

    canvas.width = config.window.width;
    canvas.height = config.window.height;
    canvas.style.width = `${config.window.width}px`;
    canvas.style.height = `${config.window.height}px`;
    
    document.body.appendChild(canvas);
    requestAnimationFrame(draw);
}

function onKeyUp(event) {
    console.log('Got a key event.');
    RLogger.debug(`Got key event ${event.keycode}.`);
    if(event.keycode === 'space') {
        paused = !paused;
        if(paused) {
            video.pause();
        }
        else {
            video.play();
        }
    }
}

function draw(time) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
}

function onBeforeUnload() {

}