"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const winston_2 = tslib_1.__importDefault(require("winston"));
class Logger {
    constructor() {
        const options = {
            format: winston_1.default.format.combine(winston_1.default.format.simple(), winston_1.default.format.colorize()),
            levels: winston_1.default.config.syslog.levels,
            transports: [
                new winston_1.default.transports.Console({
                    level: 'emerg',
                    format: winston_2.default.format.combine(),
                }),
            ],
        };
        this.logger = winston_1.default.createLogger(options);
        Logger.Instance = this;
    }
    static info(message) {
        if (Logger.Instance) {
            this.Instance.log('info', message);
        }
    }
    static debug(message) {
        if (Logger.Instance) {
            this.Instance.log('debug', message);
        }
    }
    static notice(message) {
        if (Logger.Instance) {
            this.Instance.log('notice', message);
        }
    }
    static warn(message) {
        if (Logger.Instance) {
            this.Instance.log('warn', message);
        }
    }
    static error(message) {
        if (Logger.Instance) {
            this.Instance.log('error', message);
        }
    }
    static crit(message) {
        if (Logger.Instance) {
            this.Instance.log('crit', message);
        }
    }
    static alert(message) {
        if (Logger.Instance) {
            this.Instance.log('alert', message);
        }
    }
    static emerg(message) {
        if (Logger.Instance) {
            this.Instance.log('emerg', message);
        }
    }
    log(type, message) {
        this.logger.log(type, message);
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map