"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const socket_io_1 = tslib_1.__importDefault(require("socket.io"));
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const Logger_1 = tslib_1.__importDefault(require("../utils/Logger"));
class Server {
    constructor() {
        this.port = process.env.PORT || '3000';
        this.expressApp = express_1.default();
        this.httpServer = http_1.default.createServer(this.expressApp);
        this.ioServer = socket_io_1.default(this.httpServer);
        this.sockets = new Map();
    }
    start() {
        this.expressApp.use(express_1.default.static('public'));
        this.ioServer.on('connect', this.onConnection);
        this.httpServer.listen(this.port);
        Logger_1.default.info(`Socket server started on port ${this.port}.`);
    }
    onConnection(socket) {
        Logger_1.default.info(`Socket connected from ${socket.conn.remoteAddress}.`);
        const id = uuid_1.default.v4();
        this.sockets.set(id, socket);
        socket.emit('ID', id);
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map