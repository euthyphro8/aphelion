
import LoggerService from './services/LoggerService';
import MessageService from './services/MessageService';
import CryptoService from './services/CryptoService';
import DatabaseService from './services/DatabaseService';
import AmbientContext from './services/AmbientContext';

// Initialization of all Micro Services
const logger = new LoggerService('Aphelion', 'C:\\Users\\Josh\\Storage\\Logs\\Aphelion', 10, 1);
const dbCtx = new DatabaseService('mongodb://localhost:27017', 'aphelion', 'accounts');
const crypto = new CryptoService('96c551bd-2476-49bb-801b-15d53e629d1e');
const server = new MessageService('3000', 'path');

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
`          \\/|__|        \\/     \\/                    \\/   \n` +
`----------------------------------------------------------\n` +
`Node Version:\t\t\t${process.versions.node}\n` +
`V8 Version:\t\t\t${process.versions.v8}\n` +
`CPU Architecture:\t\t${process.arch}\n` +
`Current Platform:\t\t${process.platform}\n` +
`Process ID:\t\t\t${process.pid}\n` +
`----------------------------------------------------------`);

// server.start();

// Tests
dbCtx.connect().then(() => {
    logger.alert(`Connection callback. Attempting an insert.`);
    return dbCtx.addAccount({
        username: 'name',
        email: 'user@email.com',
        password: 'password',
        score: 0
    });
}).then((result: boolean) => {
    logger.alert(`Add callback. Insert status: ${result}.`);
});

