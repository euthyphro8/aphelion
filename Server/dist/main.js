"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Server_1 = tslib_1.__importDefault(require("./comm/Server"));
const Logger_1 = tslib_1.__importDefault(require("./utils/Logger"));
const logger = new Logger_1.default('Aphelion', 'C:\\Users\\Josh\\Storage\\Logs\\Aphelion', 10, 1);
const server = new Server_1.default();
Logger_1.default.notice(`     _____         .__           .__  .__                 \n` +
    `    /  _  \\ ______ |  |__   ____ |  | |__| ____   ____    \n` +
    `   /  /_\\  \\\\____ \\|  |  \\_/ __ \\|  | |  |/  _ \\ /    \\   \n` +
    `  /    |    \\  |_> >   Y  \\  ___/|  |_|  (  <_> )   |  \\  \n` +
    `  \\____|__  /   __/|___|  /\\___  >____/__|\\____/|___|  /  \n` +
    `          \\/|__|        \\/     \\/                    \\/   \n`);
Logger_1.default.notice(``);
server.start();
//# sourceMappingURL=main.js.map