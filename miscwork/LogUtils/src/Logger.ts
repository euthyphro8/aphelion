
//Internal Dependencies
import { LogTypes } from './LogTypes';
import { RReceiver } from './window/RReceiver';
import { ConsoleLogger } from './console/ConsoleLogger';
import { WindowLogger } from './window/WindowLogger';
import { FileLogger } from './file/FileLogger';


export class Logger {

    private static instance : Logger;

    private consoleLogger : ConsoleLogger;
    private windowLogger : WindowLogger;
    private fileLogger : FileLogger;
    private rReceiver : RReceiver;
    
    constructor(useConsole : boolean, useWindow : boolean, useFile : boolean) {
        Logger.instance = this;
        if(useConsole) {
            this.consoleLogger = new ConsoleLogger();
        }
        if(useFile) {
            this.fileLogger = new FileLogger();
        }
        if(useWindow) {
            this.windowLogger = new WindowLogger();
            this.rReceiver = new RReceiver(this);
        }
    }

    onlog(type: string, msg: string) {
        if(this.consoleLogger) {
            this.consoleLogger.log(type, msg);
        }
        if(this.fileLogger) {

        }
        if(this.windowLogger) {

        }
    }

    onErr(type : string, msg : string, trace : string) {
        if(this.consoleLogger) {
            this.consoleLogger.err(type, msg, trace);
        }
        if(this.fileLogger) {

        }
        if(this.windowLogger) {

        }
    }

    static info(msg : string) : void {
        if(Logger.instance) {
            Logger.instance.onlog(LogTypes.INFO, msg);
        }
    }

    static log(msg : string) : void{
        if(Logger.instance) {
            Logger.instance.onlog(LogTypes.LOG, msg);
        }
    }

    static debug(msg : string) : void {
        if(Logger.instance) {
            Logger.instance.onlog(LogTypes.DEBUG, msg);
        }
    }

    static warn(msg : string) : void {
        if(Logger.instance) {
            Logger.instance.onlog(LogTypes.WARN, msg);
        }
    }

    static error(err : Error) : void {
        if(Logger.instance) {
            Logger.instance.onErr(err.name, err.message, err.stack || "");
        }
    }
}