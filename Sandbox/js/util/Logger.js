
const { ipcMain: ipc } = require('electron');
let instance = null;

class Logger {
    
    constructor() {
        ipc.on('log', this.onLog.bind(this));
        instance = this;
    }

    onLog(event, msg) {
        this.log()
    }

    log(msg) {
        console.log(msg);
    }

    static info(msg) {
        if(instance) {
            instance.log(msg);
        }
    }
}
module.exports = Logger;