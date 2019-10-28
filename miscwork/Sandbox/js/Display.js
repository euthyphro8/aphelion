
// External dependencies
const { BrowserWindow } = require('electron');
const { EventEmitter } = require('events');

// Internal dependencies
const Logger = require('./util/Logger');

class Display extends EventEmitter {

    constructor(config){
        super();
        this.config = config;
        this.window = null;

        this.windowOptions = {
            title: 'Sandbox',
            icon: '../img/icon.png',
            x: config.window.x,
            y: config.window.y,
            width: config.window.width,
            height: config.window.height,
            
            frame: !config.window.fullscreen,
            autoHideMenuBar: true,
            enableLargerThanScreen: true,
            kiosk: config.window.fullscreen,
            webPreferences: {
                devtools: config.window.devtools,
                contextIsolation: false,
                nodeIntegration: true,
                nodeIntegrationInWorker: true
            }
        };
        this.createWindow();
    }

//#region [green] Window Functions
    createWindow() {
        // Create the Window
        this.window = new BrowserWindow(this.windowOptions);
        // this.window.setBounds({ x: display.bounds.x, y: display.bounds.y, 
        //     width: display.bounds.width, height: display.bounds.height });

        // Add event listeners
        this.window.webContents.on('did-finish-load', this.onDidFinishLoad.bind(this));
        this.window.on('closed', this.close.bind(this));
        
        if(this.config.window.devtools)
            this.window.webContents.openDevTools( { mode: 'undocked'} );

        // Begin loading the window content
        this.window.loadURL(`file://${__dirname}/../html/display.html`);
    }

    onDidFinishLoad() {
        // Make sure all windows have loaded their html and ipc before we start initializing
        this.window.webContents.send('start', { 'config': this.config });
    }

    getWindowPid() {
        if(!this.window)
            return null;
        return this.window.webContents.getOSProcessId();
    }
//#endregion

    onLayout(layout) {
        Logger.debug(`New layout! ${JSON.stringify(layout)}`);
    }

    onClosed() {
        Logger.log(LogType.WARNING, 'Overlay window was closed.');
        this.window = null;
        this.close();
        this.emit('closed', { type : 'PrimaryWindowClosed' });
    }

    close() {
        if(this.window)
            this.window.close();
        this.window = null;
    }
    
}

module.exports = Display;