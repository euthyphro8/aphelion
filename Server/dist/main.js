"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const LoggerService_1 = tslib_1.__importDefault(require("./services/LoggerService"));
const MessageService_1 = tslib_1.__importDefault(require("./services/MessageService"));
const CryptoService_1 = tslib_1.__importDefault(require("./services/CryptoService"));
const DatabaseService_1 = tslib_1.__importDefault(require("./services/DatabaseService"));
const AmbientContext_1 = tslib_1.__importDefault(require("./services/AmbientContext"));
const logger = new LoggerService_1.default('Aphelion', 'C:\\Users\\Josh\\Storage\\Logs\\Aphelion', 10, 1);
const dbCtx = new DatabaseService_1.default('mongodb://localhost:27017', 'aphelion', 'accounts');
const crypto = new CryptoService_1.default('96c551bd-2476-49bb-801b-15d53e629d1e');
const server = new MessageService_1.default('3000', 'path');
AmbientContext_1.default.LoggerProvider = logger;
AmbientContext_1.default.DatabaseProvider = dbCtx;
AmbientContext_1.default.MessageProvider = server;
AmbientContext_1.default.CryptoProvider = crypto;
logger.notice(`     _____         .__           .__  .__                 \n` +
    `    /  _  \\ ______ |  |__   ____ |  | |__| ____   ____    \n` +
    `   /  /_\\  \\\\____ \\|  |  \\_/ __ \\|  | |  |/  _ \\ /    \\   \n` +
    `  /    |    \\  |_> >   Y  \\  ___/|  |_|  (  <_> )   |  \\  \n` +
    `  \\____|__  /   __/|___|  /\\___  >____/__|\\____/|___|  /  \n` +
    `          \\/|__|        \\/     \\/                    \\/   \n` +
    `----------------------------------------------------------\n` +
    `Node Version:\t\t\t${process.versions.node}\n` +
    `V8 Version:\t\t\t${process.versions.v8}\n` +
    `CPU Architecture:\t\t${process.arch}\n` +
    `Current Platform:\t\t${process.platform}\n` +
    `Process ID:\t\t\t${process.pid}\n` +
    `----------------------------------------------------------`);
dbCtx.connect().then(() => {
    logger.alert(`Connection callback. Attempting an insert.`);
    return dbCtx.addAccount({
        username: 'name',
        email: 'user@email.com',
        password: 'password',
        score: 0
    });
}).then((result) => {
    logger.alert(`Add callback. Insert status: ${result}.`);
});
//# sourceMappingURL=main.js.map