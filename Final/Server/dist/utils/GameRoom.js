"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const MessageTypes_1 = tslib_1.__importDefault(require("../utils/MessageTypes"));
class GameRoom {
    constructor(server, roomId) {
        this.server = server;
        this.roomId = roomId;
        this.entities = new Map();
    }
    addToRoom(clientId, socket) {
        if (this.entities.size < 10) {
            const entity = { x: 0, y: 0, hp: 100 };
            this.entities.set(clientId, entity);
            socket.join(this.roomId);
            socket.on(MessageTypes_1.default.ClientTick, this.onClientTick.bind(this));
            return true;
        }
        return false;
    }
    removeFromRoom(clientId, socket) {
        if (this.entities.has(clientId)) {
            this.entities.delete(clientId);
            socket.leave(this.roomId);
            socket.off(MessageTypes_1.default.ClientTick, this.onClientTick.bind(this));
            return true;
        }
        return false;
    }
    tick() {
        this.server.in(this.roomId).emit(MessageTypes_1.default.ServerTick, Array.from(this.entities));
    }
    onClientTick(clientId, entity) {
        this.entities.set(clientId, entity);
    }
}
exports.default = GameRoom;
//# sourceMappingURL=GameRoom.js.map