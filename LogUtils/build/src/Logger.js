"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Internal Dependencies
const LogTypes_1 = require("./LogTypes");
const RReceiver_1 = require("./window/RReceiver");
const ConsoleLogger_1 = require("./console/ConsoleLogger");
const WindowLogger_1 = require("./window/WindowLogger");
const FileLogger_1 = require("./file/FileLogger");
class Logger {
    constructor(useConsole, useWindow, useFile) {
        Logger.instance = this;
        if (useConsole) {
            this.consoleLogger = new ConsoleLogger_1.ConsoleLogger();
        }
        if (useFile) {
            this.fileLogger = new FileLogger_1.FileLogger();
        }
        if (useWindow) {
            this.windowLogger = new WindowLogger_1.WindowLogger();
            this.rReceiver = new RReceiver_1.RReceiver(this);
        }
    }
    onlog(type, msg) {
        if (this.consoleLogger) {
            this.consoleLogger.log(type, msg);
        }
        if (this.fileLogger) {
        }
        if (this.windowLogger) {
        }
    }
    onErr(type, msg, trace) {
        if (this.consoleLogger) {
            this.consoleLogger.err(type, msg, trace);
        }
        if (this.fileLogger) {
        }
        if (this.windowLogger) {
        }
    }
    static info(msg) {
        if (Logger.instance) {
            Logger.instance.onlog(LogTypes_1.LogTypes.INFO, msg);
        }
    }
    static log(msg) {
        if (Logger.instance) {
            Logger.instance.onlog(LogTypes_1.LogTypes.LOG, msg);
        }
    }
    static debug(msg) {
        if (Logger.instance) {
            Logger.instance.onlog(LogTypes_1.LogTypes.DEBUG, msg);
        }
    }
    static warn(msg) {
        if (Logger.instance) {
            Logger.instance.onlog(LogTypes_1.LogTypes.WARN, msg);
        }
    }
    static error(err) {
        if (Logger.instance) {
            Logger.instance.onErr(err.name, err.message, err.stack || "");
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map