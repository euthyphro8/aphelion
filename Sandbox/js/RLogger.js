
const { ipcRender: ipc } = require('electron');

class RLogger {
    static info(msg) {
        ipc.emit('log', msg);
    }
}
module.exports = RLogger;