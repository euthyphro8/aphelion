"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const MessageTypes_1 = tslib_1.__importDefault(require("../utils/MessageTypes"));
const GameRoom_1 = tslib_1.__importDefault(require("../utils/GameRoom"));
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
class GameService {
    constructor() {
        this.gamers = new Map();
        this.rooms = [];
        this.stepTime = (1000.0 / 30.0);
        this.lastRoomNumber = 0;
        this.requestId = null;
    }
    getPlayerCount() {
        return this.gamers.size;
    }
    registerGamer(clientId, gamer) {
        this.gamers.set(clientId, gamer);
        gamer.on(MessageTypes_1.default.LeaveRoomRequest, this.onLeaveRoomRequest.bind(this));
        let roomId = '';
        for (const room of this.rooms) {
            if (room.addToRoom(clientId, gamer)) {
                roomId = room.roomId;
                break;
            }
        }
        if (!roomId) {
            const server = AmbientContext_1.default.ConnectionProvider.ioServer;
            roomId = `Aphelion-${++this.lastRoomNumber}`;
            const room = new GameRoom_1.default(server, roomId);
            room.addToRoom(clientId, gamer);
            this.rooms.push(room);
        }
        if (!this.requestId) {
            this.requestId = setInterval(this.tick.bind(this), this.stepTime);
        }
        return roomId;
    }
    unregisterGamer(clientId) {
        const gamer = this.gamers.get(clientId);
        if (gamer) {
            for (const room of this.rooms) {
                if (room.removeFromRoom(clientId, gamer)) {
                    break;
                }
            }
            this.gamers.delete(clientId);
            if (this.gamers.size === 0 && this.requestId) {
                clearInterval(this.requestId);
                this.requestId = null;
            }
        }
    }
    onLeaveRoomRequest(clientId, username, finalScore) {
        AmbientContext_1.default.LoggerProvider.info(`[GameRoom] Got leave room request from ${clientId}.`);
        AmbientContext_1.default.DatabaseProvider.getAccount(username, false).then((account) => {
            if (account) {
                account.score += finalScore;
                AmbientContext_1.default.DatabaseProvider.updateAccount(account);
            }
        });
        this.unregisterGamer(clientId);
    }
    tick() {
        this.rooms.forEach((room) => room.tick());
    }
}
exports.default = GameService;
//# sourceMappingURL=GameService.js.map