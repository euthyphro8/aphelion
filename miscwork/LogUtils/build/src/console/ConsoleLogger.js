"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogTypes_1 = require("../LogTypes");
class ConsoleLogger {
    constructor() {
    }
    log(type, msg) {
        if (type == LogTypes_1.LogTypes.INFO)
            console.log(msg);
        else
            console.log(`[ ${type} ] ${msg}`);
    }
    err(type, msg, trace) {
        console.log(`[ ERR ] [ ${type} ] ${msg}\n${trace}`);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map