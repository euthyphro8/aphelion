
import { LogTypes } from '../LogTypes';

export class ConsoleLogger {

    constructor() {

    }

    log(type: LogTypes, msg : string) {
        if(type == LogTypes.INFO)
            console.log(msg);
        else
            console.log(`[ ${type} ] ${msg}`);
    }

    err(type : string, msg : string, trace : string) {
        console.log(`[ ERR ] [ ${type} ] ${msg}\n${trace}`);
    }

}