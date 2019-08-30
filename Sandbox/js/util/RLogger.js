
const { ipcRender: ipc } = require('electron');

const LogTypes = require('./LogTypes');

class RLogger {

    static log(type, msg, errMsg = null, errTrace = null) {
        ipc.emit('log', type, msg, errMsg, errTrace);
    }

    static notice(msg) {
        RLogger.log(LogTypes.NOTICE, msg);
    }

    static info(msg) {
        RLogger.log(LogTypes.INFO, msg);
    }

    static warn(msg) {
        RLogger.log(LogTypes.WARN, msg);
    }

    static debug(msg) {
        RLogger.log(LogTypes.DEBUG, msg);
    }

    static error(msg, err = null) {
        if(err)
            RLogger.log(LogTypes.ERROR, msg, err.message, err.trace);
        else
            RLogger.log(LogTypes.ERROR, msg);

    }

}
module.exports = RLogger;