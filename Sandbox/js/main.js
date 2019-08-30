// ****** Main process ******

// External Dependencies
const fs = require('fs');
const electron = require('electron');
const { app: app } = electron;
const { globalShortcut } = electron;
const { ipcMain: ipc } = electron;

// Local Dependencies
const Display = require('./Display');
const Logger = require('./util/Logger');

// Global fields
let config = null;
let display = null;
let logger = null;
let monitor = null;

// Can be overidden with cli arg config=[PATH_TO_SETTINGS]
let configPath = `.\\config.json`;

//App configuration
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

// Event listeners
app.on('ready', onReady);
app.on('will-quit', onGoingDown);
app.on('window-all-closed', onGoingDown);
app.on('gpu-process-crashed', onGoingDown);

// Program entrypoint
function onReady() {
    loadArgs();
    loadConfig();
    // loadDisplay();
    
    logger = new Logger();
    
    setTimeout(() => {
        printInfo();
        display = new Display(config);
        display.on('closed', onGoingDown);
    }, 500);
}

function onGoingDown(event) {
    Logger.warn(`Got event ${event.type}. Cleaning up and going Down.`);
    if(logger) {
        logger.close();
        logger = null;
    }
    if(display && event.type !== 'PrimaryWindowClosed') {
        display.close();
        display = null;
    }
    globalShortcut.unregisterAll();
    app.quit();
}

// Handles logging from render processes
function onLog(event, content) {
    Logger.log(content.type, content.msg, content.prependType, content.err);
}

// Loads the command line args
function loadArgs() {
    for(const arg of process.argv) {
        const argParts = arg.split('=');
        switch(argParts[0]) {
            case 'config':
                configPath = argParts[1];
                break;
        }
    }
}

//Loads the config
function loadConfig() {
    let configFile = fs.readFileSync(configPath);
    config = JSON.parse(configFile.toString());
}

function loadDisplay() {
    let useCustom =  config.window.display.custom;
    let orderId = config.window.display.orderId;
    monitor = !useCustom || orderId >= displays.length || orderId < 0 ? 
        electron.screen.getPrimaryDisplay() : 
        electron.screen.getAllDisplays()[orderId];
}


function printInfo() {
    Logger.info("\t-------- Versions  --------", false);
    Logger.info(`Thought Bot Version:\t\t<u>${app.getVersion()}</u>`, false);
    Logger.info(`Electron Version:\t\t<u>${process.versions.electron}</u>`, false);
    Logger.info(`Node Version:\t\t\t<u>${process.versions.node}</u>`, false);
    Logger.info(`Chromium Version:\t\t<u>${process.versions.chrome}</u>`, false);

    Logger.info("\t-------- Process IDs --------", false);
    Logger.info(`Main Electron PID:\t\t<u>${process.pid}</u>`, false);
    Logger.info(`Renderer PID:\t\t<u>${display ? display.getWindowPid() : 'NA'}</u>`, false);
    Logger.info("\t-------- Starting --------", false);
}

