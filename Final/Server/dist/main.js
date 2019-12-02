"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const LoggerService_1 = tslib_1.__importDefault(require("./services/LoggerService"));
const MessageService_1 = tslib_1.__importDefault(require("./services/MessageService"));
const CryptoService_1 = tslib_1.__importDefault(require("./services/CryptoService"));
const DatabaseService_1 = tslib_1.__importDefault(require("./services/DatabaseService"));
const AmbientContext_1 = tslib_1.__importDefault(require("./services/AmbientContext"));
const ConnectionService_1 = tslib_1.__importDefault(require("./services/ConnectionService"));
const GameService_1 = tslib_1.__importDefault(require("./services/GameService"));
let mongodbUri = 'mongodb://localhost:27017';
if (process.env.MONGO_URI) {
    mongodbUri = process.env.MONGO_URI;
}
console.log(`${process.env.MONGO_URI}`);
const logger = new LoggerService_1.default('Aphelion', 'C:\\Users\\Josh\\Storage\\Logs\\Aphelion', 10, 10 * 1024 * 1024);
const dbCtx = new DatabaseService_1.default(mongodbUri, 'local', 'accounts');
const crypto = new CryptoService_1.default(10);
const server = new ConnectionService_1.default('3000', 'path');
const messenger = new MessageService_1.default();
const game = new GameService_1.default();
AmbientContext_1.default.LoggerProvider = logger;
AmbientContext_1.default.DatabaseProvider = dbCtx;
AmbientContext_1.default.ConnectionProvider = server;
AmbientContext_1.default.CryptoProvider = crypto;
AmbientContext_1.default.MessageProvider = messenger;
AmbientContext_1.default.GameProvider = game;
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
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield dbCtx.connect();
    server.start();
}))();
//# sourceMappingURL=main.js.map