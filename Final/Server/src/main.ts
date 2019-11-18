
import LoggerService from './services/LoggerService';
import MessageService from './services/MessageService';
import CryptoService from './services/CryptoService';
import DatabaseService from './services/DatabaseService';
import AmbientContext from './services/AmbientContext';
import ConnectionService from './services/ConnectionService';
import GameService from './services/GameService';

// Initialization of all Micro Services
const logger = new LoggerService('Aphelion', 'C:\\Users\\Josh\\Storage\\Logs\\Aphelion', 10, 10 * 1024 * 1024);
const dbCtx = new DatabaseService('mongodb://localhost:27017', 'local', 'accounts');
const crypto = new CryptoService(10);
const server = new ConnectionService('3000', 'path');
const messenger = new MessageService();
const game = new GameService();

// Add all micro-services to the ambient context
AmbientContext.LoggerProvider = logger;
AmbientContext.DatabaseProvider = dbCtx;
AmbientContext.ConnectionProvider = server;
AmbientContext.CryptoProvider = crypto;
AmbientContext.MessageProvider = messenger;
AmbientContext.GameProvider = game;

logger.notice(
`     _____         .__           .__  .__                 \n` +
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

(async () => {
    await dbCtx.connect();
    server.start();
})();
