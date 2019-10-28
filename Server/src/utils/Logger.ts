
import Winston from 'winston';
import winston from 'winston';

/**
 * Log levels in accordance with the Syslog Protocol
 * https://tools.ietf.org/html/rfc5424
 */

type LogLevel = 'debug' | 'info' | 'notice' | 'warn' | 'error' | 'crit' | 'alert' | 'emerg';

class Logger {

    public static Instance: Logger;

    public static info(message: string): void {
        if (Logger.Instance) {
            this.Instance.log('info', message);
        }
    }

    public static debug(message: string): void {
        if (Logger.Instance) {
            this.Instance.log('debug', message);
        }
    }

    public static notice(message: string): void {
        if (Logger.Instance) {
            this.Instance.log('notice', message);
        }
    }

    public static warn(message: string): void {
        if (Logger.Instance) {
            this.Instance.log('warn', message);
        }
    }

    public static error(message: string): void {
        if (Logger.Instance) {
            this.Instance.log('error', message);
        }
    }

    public static crit(message: string): void {
        if (Logger.Instance) {
            this.Instance.log('crit', message);
        }
    }

    public static alert(message: string): void {
        if (Logger.Instance) {
            this.Instance.log('alert', message);
        }
    }

    public static emerg(message: string): void {
        if (Logger.Instance) {
            this.Instance.log('emerg', message);
        }
    }

    private logger: Winston.Logger;

    constructor() {
        const options = {
            format: Winston.format.combine(
                Winston.format.simple(),
                Winston.format.colorize(),
            ),
            levels: Winston.config.syslog.levels,
            transports: [
                new Winston.transports.Console({
                    level: 'emerg',
                    format: winston.format.combine(),
                }),
            ],
        } as Winston.LoggerOptions;
        this.logger = Winston.createLogger(options);
        // Winston.addColors(Winston.config.syslog.colors);
        Logger.Instance = this;
    }

    private log(type: LogLevel, message: string): void {
        this.logger.log(type, message);
    }
}

export default Logger;
