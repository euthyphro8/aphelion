
// External Dependencies
import express from 'express';
import http from 'http';
import io from 'socket.io';

// Internal Dependencies
import Context from './AmbientContext';
import MessageTypes from '../utils/MessageTypes';

class ConnectionService {
    private expressApp: any; // Express.Application; not sure why the type doesn't work for this
    private httpServer: http.Server;
    private ioServer: io.Server;
    private port: string;

    private sockets: Map<string, io.Socket>;

    constructor(port: string, path: string) {
        this.port = process.env.PORT || port;
        this.sockets = new Map<string, io.Socket>();
        this.expressApp = express();
        this.httpServer = http.createServer(this.expressApp);
        this.ioServer = io(this.httpServer);
    }

    public start() {
        this.expressApp.use(express.static('public'));
        this.ioServer.on('connect', this.onConnection.bind(this));
        this.httpServer.listen(this.port);
        Context.LoggerProvider.info(`Socket server started on port ${this.port}.`);
    }

    private onConnection(socket: io.Socket) {
        socket.emit(MessageTypes.IdRequest, (clientId: string) => {
            Context.LoggerProvider.info(`Client [${clientId}] connected from [${socket.handshake.address}].`);
            this.sockets.set(clientId, socket);
            Context.MessageProvider.registerMessenger(clientId, socket);
            socket.once('disconnect', (reason) => {
                Context.LoggerProvider.debug(`Client [${clientId}] disconnected, reason: ${reason}.`);
                Context.MessageProvider.unregisterMessenger(clientId);
                this.sockets.delete(clientId);
            });
        });
    }
}

export default ConnectionService;
