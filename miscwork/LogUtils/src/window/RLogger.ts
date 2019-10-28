
import { ipcRender } from 'electron';
import LogTypes from '../LogTypes';

export class RLogger {

    private static LOG_EVENT = 'log';
    private static ERR_EVENT = 'err';

    private static onLog(type : LogTypes, msg : string) {
        ipcRender.emit('log', type, msg);
    }

    private static onErr(err : Error) {
        ipcRender.emit('err', err.name, err.message, err.stack);
    }

    static info(msg : string) {
        RLogger.onLog(LogTypes.INFO, msg);
    }

    static log(msg : string) {
        RLogger.onLog(LogTypes.LOG, msg);
    }
    
    static debug(msg : string) {
        RLogger.onLog(LogTypes.DEBUG, msg);
    }

    static warn(msg : string) {
        RLogger.onLog(LogTypes.WARN, msg);
    }

    static error(err : Error) {
        RLogger.onErr(err);
    }

}