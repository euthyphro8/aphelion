"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const LogTypes_1 = tslib_1.__importDefault(require("../LogTypes"));
class RLogger {
    static onLog(type, msg) {
        electron_1.ipcRender.emit('log', type, msg);
    }
    static onErr(err) {
        electron_1.ipcRender.emit('err', err.name, err.message, err.stack);
    }
    static info(msg) {
        RLogger.onLog(LogTypes_1.default.INFO, msg);
    }
    static log(msg) {
        RLogger.onLog(LogTypes_1.default.LOG, msg);
    }
    static debug(msg) {
        RLogger.onLog(LogTypes_1.default.DEBUG, msg);
    }
    static warn(msg) {
        RLogger.onLog(LogTypes_1.default.WARN, msg);
    }
    static error(err) {
        RLogger.onErr(err);
    }
}
RLogger.LOG_EVENT = 'log';
RLogger.ERR_EVENT = 'err';
exports.RLogger = RLogger;
//# sourceMappingURL=RLogger.js.map