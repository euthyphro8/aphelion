"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const socket_io_1 = tslib_1.__importDefault(require("socket.io"));
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
const MessageTypes_1 = tslib_1.__importDefault(require("../utils/MessageTypes"));
class ConnectionService {
    constructor(port) {
        this.port = process.env.PORT || port;
        this.sockets = new Map();
        this.expressApp = express_1.default();
        this.httpServer = http_1.default.createServer(this.expressApp);
        this.ioServer = socket_io_1.default(this.httpServer);
    }
    start() {
        this.expressApp.use(express_1.default.static('public'));
        this.expressApp.get('/stats', this.onGetStats.bind(this));
        this.ioServer.on('connect', this.onConnection.bind(this));
        this.httpServer.listen(this.port);
        AmbientContext_1.default.LoggerProvider.info(`[ CONN SVC ] Socket server started on port ${this.port}.`);
    }
    onConnection(socket) {
        socket.emit(MessageTypes_1.default.IdRequest, (clientId) => {
            AmbientContext_1.default.LoggerProvider.info(`[ CONN SVC ] Client [${clientId}] connected from [${socket.handshake.address}].`);
            this.sockets.set(clientId, socket);
            AmbientContext_1.default.MessageProvider.registerMessenger(clientId, socket);
            socket.once('disconnect', (reason) => {
                AmbientContext_1.default.LoggerProvider.debug(`[ CONN SVC ] Client [${clientId}] disconnected, reason: ${reason}.`);
                AmbientContext_1.default.MessageProvider.unregisterMessenger(clientId);
                AmbientContext_1.default.GameProvider.unregisterGamer(clientId);
                this.sockets.delete(clientId);
            });
        });
    }
    onGetStats(request, response) {
        response.send({ playerCount: AmbientContext_1.default.GameProvider.getPlayerCount() });
    }
}
exports.default = ConnectionService;
//# sourceMappingURL=ConnectionService.js.map