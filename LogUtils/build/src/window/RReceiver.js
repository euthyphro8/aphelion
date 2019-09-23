"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
//External Dependencies
const electron_1 = tslib_1.__importDefault(require("electron"));
class RReceiver {
    constructor(logger) {
        if (electron_1.default) {
            console.log("Electron wasn't loaded, window logger unavailable.");
            return;
        }
        this.logger = logger;
        electron_1.default.on('log', this.onLog.bind(this));
        electron_1.default.on('err', this.onErr.bind(this));
    }
    onLog(event, type, msg) {
        this.logger.log(type, msg);
    }
    onErr(event, name, message, trace) {
        this.logger.onErr(name, message, trace);
    }
}
exports.RReceiver = RReceiver;
//# sourceMappingURL=RReceiver.js.map