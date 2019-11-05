
import Server from './services/MessageService';
import Logger from './utils/Logger';

// Initialization
const logger = new Logger('Aphelion', 'C:\\Users\\Josh\\Storage\\Logs\\Aphelion', 10, 1);
const server = new Server();

Logger.notice(
`     _____         .__           .__  .__                 \n` +
`    /  _  \\ ______ |  |__   ____ |  | |__| ____   ____    \n` +
`   /  /_\\  \\\\____ \\|  |  \\_/ __ \\|  | |  |/  _ \\ /    \\   \n` +
`  /    |    \\  |_> >   Y  \\  ___/|  |_|  (  <_> )   |  \\  \n` +
`  \\____|__  /   __/|___|  /\\___  >____/__|\\____/|___|  /  \n` +
`          \\/|__|        \\/     \\/                    \\/   \n`);
Logger.notice(``);

server.start();
