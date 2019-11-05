
import LoggerService from './services/LoggerService';
import MessageService from './services/MessageService';
import CryptoService from './services/CryptoService';
import DatabaseService from './services/DatabaseService';
import AmbientContext from './services/AmbientContext';

// Initialization of all Micro Services
const logger = new LoggerService('Aphelion', 'C:\\Users\\Josh\\Storage\\Logs\\Aphelion', 10, 1);
const dbCtx = new DatabaseService('mongodb://localhost:27017', 'aphelion', 'accounts');
const crypto = new CryptoService();
const server = new MessageService();

// Add all micro-services to the ambient context
AmbientContext.LoggerProvider = logger;
AmbientContext.DatabaseProvider = dbCtx;
AmbientContext.MessageProvider = server;
AmbientContext.CryptoProvider = crypto;

logger.notice(
`     _____         .__           .__  .__                 \n` +
`    /  _  \\ ______ |  |__   ____ |  | |__| ____   ____    \n` +
`   /  /_\\  \\\\____ \\|  |  \\_/ __ \\|  | |  |/  _ \\ /    \\   \n` +
`  /    |    \\  |_> >   Y  \\  ___/|  |_|  (  <_> )   |  \\  \n` +
`  \\____|__  /   __/|___|  /\\___  >____/__|\\____/|___|  /  \n` +
`          \\/|__|        \\/     \\/                    \\/   \n`);
logger.notice(``);

server.start();
