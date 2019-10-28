
import Winston from 'winston';

/**
 * Log levels in accordance with the Syslog Protocol
 * https://tools.ietf.org/html/rfc5424
 */

type LogLevel = 'debug' | 'informational' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency';

class Logger {

    public static Instance: Logger;

    public static info(message: string): void {
        if (Logger.Instance) {
            this.Instance.log('informational', message);
        }
    }

    private logger: Winston.Logger;

    constructor() {
        const options = {
            format: Winston.format.combine(
                Winston.format.colorize(),
                Winston.format.prettyPrint()
            ),
            levels: Winston.config.syslog.levels,
            transports: [
                new Winston.transports.Console()
            ]
        };
        this.logger = Winston.createLogger(options);
        Winston.addColors(Winston.config.syslog.colors);
        Logger.Instance = this;
    }

    private log(type: LogLevel, message: string): void {
        this.logger.log(type, message);
    }
}

export default Logger;
