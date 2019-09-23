//External Dependencies
import ipcMain from 'electron';

//Internal Dependencies
import Logger from './Logger';
import { LogTypes } from '../LogTypes';

export class RReceiver {

    logger : Logger;

    constructor(logger : Logger) {
        if(ipcMain) {
            console.log("Electron wasn't loaded, window logger unavailable.");
            return;
        }
        this.logger = logger;

        ipcMain.on('log', this.onLog.bind(this));
        ipcMain.on('err', this.onErr.bind(this));
    }

    onLog(event: Event, type: string, msg: string) {
        this.logger.log(type, msg);
    }

    onErr(event : Event, name : string, message : string, trace : string) {
        this.logger.onErr(name, message, trace);
    }
}
