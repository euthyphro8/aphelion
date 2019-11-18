"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
class Logger {
    constructor(logName, filename, maxFiles, maxSize) {
        console.log('\n-- LOGGER INITIALIZED --');
        const customLevels = {
            levels: {
                emerg: 0,
                alert: 1,
                crit: 2,
                error: 3,
                warn: 4,
                notice: 5,
                info: 6,
                debug: 7
            },
            colors: {
                emerg: 'black whiteBG',
                alert: 'white yellowBG',
                crit: 'white redBG',
                error: 'red',
                warn: 'yellow',
                notice: 'magenta',
                info: 'cyan',
                debug: 'green'
            },
        };
        const customPrint = winston_1.default.format.printf(({ label, level, message, timestamp }) => {
            let msg = level;
            msg = msg.replace('emerg', `[${timestamp}][ ${label} ][ EMERG ] ${message}`);
            msg = msg.replace('alert', `[${timestamp}][ ${label} ][ ALERT ] ${message}`);
            msg = msg.replace('crit', `[${timestamp}][ ${label} ][ CRIT  ] ${message}`);
            msg = msg.replace('error', `[${timestamp}][ ${label} ][ ERROR ] ${message}`);
            msg = msg.replace('warn', `[${timestamp}][ ${label} ][ WARN  ] ${message}`);
            msg = msg.replace('notice', `${message}`);
            msg = msg.replace('info', `[${timestamp}][ ${label} ][ INFO  ] ${message}`);
            msg = msg.replace('debug', `[${timestamp}][ ${label} ][ DEBUG ] ${message}`);
            return msg;
        });
        this.logger = winston_1.default.createLogger({
            levels: customLevels.levels,
            exitOnError: false,
            defaultMeta: {
                service: 'user-service',
            },
            transports: [
                new winston_1.default.transports.File({
                    filename: filename,
                    maxFiles: maxFiles,
                    maxsize: maxSize,
                    handleExceptions: false,
                    zippedArchive: false,
                    format: winston_1.default.format.combine(winston_1.default.format.label({
                        label: logName
                    }), winston_1.default.format.timestamp({
                        format: `MM/DD/YY HH:mm:ss`
                    }), winston_1.default.format.uncolorize(), winston_1.default.format.splat(), customPrint)
                }),
                new winston_1.default.transports.Console({
                    format: winston_1.default.format.combine(winston_1.default.format.label({
                        label: logName,
                    }), winston_1.default.format.timestamp({
                        format: `MM/DD/YY HH:mm:ss`
                    }), winston_1.default.format.colorize({
                        all: true,
                        colors: customLevels.colors,
                    }), winston_1.default.format.splat(), customPrint)
                })
            ]
        });
        this.logger.level = 'debug';
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