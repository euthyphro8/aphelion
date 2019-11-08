"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const socket_io_1 = tslib_1.__importDefault(require("socket.io"));
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
class ConnectionService {
    constructor(port, path) {
        this.port = process.env.PORT || port;
        this.sockets = new Map();
        this.expressApp = express_1.default();
        this.httpServer = http_1.default.createServer(this.expressApp);
        this.ioServer = socket_io_1.default(this.httpServer);
    }
    start() {
        this.expressApp.use(express_1.default.static('public'));
        this.ioServer.on('connect', this.onConnection.bind(this));
        this.httpServer.listen(this.port);
        AmbientContext_1.default.LoggerProvider.info(`Socket server started on port ${this.port}.`);
    }
    onConnection(socket) {
        socket.emit('ID_REQ', (clientId) => {
            AmbientContext_1.default.LoggerProvider.info(`Client [${clientId}] connected from [${socket.handshake.address}].`);
            this.sockets.set(clientId, socket);
        });
    }
}
exports.default = ConnectionService;
//# sourceMappingURL=ConnectionService.js.map