
// External Dependencies
import express from 'express';
import http from 'http';
import io from 'socket.io';
import uuid from 'uuid';

// Internal Dependencies
import Logger from '../utils/Logger';

// Global Fields

class Server {

    private expressApp: any; // Express.Application; not sure why the type doesn't work for this
    private httpServer: http.Server;
    private ioServer: io.Server;
    private port: string;

    private sockets: Map<string, io.Socket>;

    constructor() {
        this.port = process.env.PORT || '3000';
        this.expressApp = express();
        this.httpServer = http.createServer(this.expressApp);
        this.ioServer = io(this.httpServer);

        this.sockets = new Map<string, io.Socket>();
    }

    public start() {
        this.expressApp.use(express.static('public'));
        this.ioServer.on('connect', this.onConnection);
        this.httpServer.listen(this.port);

        Logger.info(`Socket server started on port ${this.port}.`);
    }

    private onConnection(socket: io.Socket) {
        Logger.info(`Socket connected from ${socket.conn.remoteAddress}.`);
        const id = uuid.v4();
        this.sockets.set(id, socket);
        socket.emit('ID', id);
    }
}

export default Server;
