
//External Dependencies
const { ipcMain: ipc } = require('electron');

//Internal Dependencies
const LogTypes = require('./LogTypes');

let instance = null;

class Logger {
    
    constructor() {
        ipc.on('log', this.onLog.bind(this));
        instance = this;
    }

    onLog(event, msg, errMsg, errTrace) {
        this.log(type, msg, errMsg, errTrace);
    }

    log(type, msg, errMsg = null, errTrace = null) {
        console.log(msg);
        switch(type) {
            case LogTypes.INFO:
                break;
            case LogTypes.DEBUG:
                break;
            case LogTypes.WARN:
                break;
            case LogTypes.ERROR:
                break;
        }
    }

    static notice() {
        
    }

    static info(msg) {
        if(instance) {
            instance.log(LogTypes.INFO, msg);
        }
    }

    static debug(msg) {
        if(instance) {
            instance.log(LogTypes.INFO, msg);
        }
    }

    static warn(msg) {
        if(instance) {
            instance.log(LogTypes.INFO, msg);
        }
    }

    static error(msg, err = null) {
        if(instance) {
            if(err)
            instance.log(LogTypes.ERROR, msg, err.message, err.trace);
            else
            instance.log(LogTypes.ERROR, msg);
        }
    }
}
module.exports = Logger;