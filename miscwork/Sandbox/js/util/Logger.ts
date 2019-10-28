
//External Dependencies
const { ipcMain: ipc } = require('electron');

//Internal Dependencies
const LogTypes = require('./LogTypes');


class Logger {
    static instance:Logger;
    
    constructor() {
        Logger.instance = this;
        ipc.on('log', this.onLog.bind(this));
    }

    onLog(event: Event, type: string, msg: string, errMsg: string, errTrace: string) {
        this.log(type, msg, errMsg, errTrace);
    }

    log(type: string, msg: string, errMsg: string = '', errTrace: string = '') {
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

    static info(msg: string) {
        if(Logger.instance) {
            Logger.instance.log(LogTypes.INFO, msg);
        }
    }

    static debug(msg: string) : void{
        if(Logger.instance) {
            Logger.instance.log(LogTypes.INFO, msg);
        }
    }

    static warn(msg: string) : void {
        if(Logger.instance) {
            Logger.instance.log(LogTypes.INFO, msg);
        }
    }

    static error(err: Error) {
        if(Logger.instance) {
            Logger.instance.log(LogTypes.ERROR, err.message, err.stack);
        }
    }
}
module.exports = Logger;