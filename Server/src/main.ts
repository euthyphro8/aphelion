
import Server from './coms/Server';
import Logger from './utils/Logger';

// Initialization
const logger = new Logger();
const server = new Server();

server.start();
