
// External Dependencies
import express from 'express';
import http from 'http';
import io from 'socket.io';
import bcrypt from 'bcrypt';
// import uuid from 'uuid';

// Internal Dependencies
import Logger from '../utils/Logger';
import IAuthResponse from '../interfaces/IAuthResponse';

// Global Fields

class MessageService {
    private expressApp: any; // Express.Application; not sure why the type doesn't work for this
    private httpServer: http.Server;
    private ioServer: io.Server;
    private port: string;

    private sockets: Map<string, io.Socket>;

    constructor() {
        this.port = process.env.PORT || '3000';
        this.sockets = new Map<string, io.Socket>();
        this.expressApp = express();
        this.httpServer = http.createServer(this.expressApp);
        this.ioServer = io(this.httpServer);
    }

    public start() {
        this.expressApp.use(express.static('public'));
        this.ioServer.on('connect', this.onConnection.bind(this));
        this.httpServer.listen(this.port);

        Logger.info(`Socket server started on port ${this.port}.`);
    }

    private onConnection(socket: io.Socket) {
        socket.emit('ID_REQ', (clientId: string) => {
            Logger.info(`Client [${clientId}] connected from [${socket.handshake.address}].`);
            this.sockets.set(clientId, socket);
        });
    }

    // private onRequestLogin(clientId: string, humanId: string, isEmail: boolean, password: string,
    //     callback: (response: IAuthResponse) => void): void {
    //         // TODO: store in database
    //         callback();
    // }
}

export default MessageService;
