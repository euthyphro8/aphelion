"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
class LoggerService {
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
    }
    info(message) {
        this.log('info', message);
    }
    debug(message) {
        this.log('debug', message);
    }
    notice(message) {
        this.log('notice', message);
    }
    warn(message) {
        this.log('warn', message);
    }
    error(message) {
        this.log('error', message);
    }
    crit(message) {
        this.log('crit', message);
    }
    alert(message) {
        this.log('alert', message);
    }
    emerg(message) {
        this.log('emerg', message);
    }
    log(type, message) {
        this.logger.log(type, message);
    }
}
exports.default = LoggerService;
//# sourceMappingURL=LoggerService.js.map