
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

    public start(): void {
        this.expressApp.use(express.static('public'));
        this.expressApp.get('/stats', this.onGetStats.bind(this));
        this.ioServer.on('connect', this.onConnection.bind(this));
        this.httpServer.listen(this.port);
        Context.LoggerProvider.info(`[ CONN SVC ] Socket server started on port ${this.port}.`);
    }

    private onConnection(socket: io.Socket): void {
        socket.emit(MessageTypes.IdRequest, (clientId: string) => {
            Context.LoggerProvider.info(`[ CONN SVC ] Client [${clientId}] connected from [${socket.handshake.address}].`);
            this.sockets.set(clientId, socket);
            Context.MessageProvider.registerMessenger(clientId, socket);
            socket.once('disconnect', (reason) => {
                Context.LoggerProvider.debug(`[ CONN SVC ] Client [${clientId}] disconnected, reason: ${reason}.`);
                Context.MessageProvider.unregisterMessenger(clientId);
                this.sockets.delete(clientId);
            });
        });
    }

    private onGetStats(request: any, response: any): void {
        response.send({ playerCount: 13 });
    }
}

export default ConnectionService;
