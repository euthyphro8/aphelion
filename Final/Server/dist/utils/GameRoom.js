"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const MessageTypes_1 = tslib_1.__importDefault(require("../utils/MessageTypes"));
const AmbientContext_1 = tslib_1.__importDefault(require("../services/AmbientContext"));
class GameRoom {
    constructor(server, roomId) {
        this.hAccel = 1.1;
        this.hdMax = 100;
        this.hsMax = 200;
        this.server = server;
        this.roomId = roomId;
        this.entities = new Map();
        this.hazard = {
            x: 1920 / 2,
            y: 1080 / 2,
            size: 70
        };
        this.hdx = ((Math.random() * 10) + 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
        this.hdy = ((Math.random() * 10) + 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
    }
    hasPlayers() {
        return this.entities.size !== 0;
    }
    addToRoom(clientId, socket) {
        if (this.entities.size < 10) {
            const entity = { x: 0, y: 0, name: 'New User', rechargeTime: 0, shieldTime: 0, blockedThisShield: false };
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
            if (this.entities.size <= 0) {
                this.reset();
            }
            return true;
        }
        return false;
    }
    tick() {
        if (this.entities.size > 0) {
            this.updateHazard();
            this.checkCollisions();
            this.server.in(this.roomId).emit(MessageTypes_1.default.ServerTick, this.hazard, Array.from(this.entities));
        }
        else {
            this.reset();
        }
    }
    reset() {
        AmbientContext_1.default.LoggerProvider.debug(`[GameRoom] Room ${this.roomId} reset.`);
        this.hazard = {
            x: 1920 / 2,
            y: 1080 / 2,
            size: 70
        };
        this.hdx = ((Math.random() * 10) + 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
        this.hdy = ((Math.random() * 10) + 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
    }
    updateHazard() {
        this.hazard.x += this.hdx;
        this.hazard.y += this.hdy;
        if (this.hazard.x > 1920 - (this.hazard.size)) {
            this.hazard.x = 1920 - (this.hazard.size);
            this.hdx = -(this.hdx * this.hAccel);
        }
        else if (this.hazard.x < 0 + (this.hazard.size)) {
            this.hazard.x = 0 + (this.hazard.size);
            this.hdx = -(this.hdx * this.hAccel);
        }
        if (this.hazard.y > 1080 - (this.hazard.size)) {
            this.hazard.y = 1080 - (this.hazard.size);
            this.hdy = -(this.hdy * this.hAccel);
        }
        else if (this.hazard.y < 0 + (this.hazard.size)) {
            this.hazard.y = 0 + (this.hazard.size);
            this.hdy = -(this.hdy * this.hAccel);
        }
        if (this.hdx > this.hdMax) {
            this.hdx = this.hdMax;
            this.hazard.size *= this.hAccel;
        }
        if (this.hdy > this.hdMax) {
            this.hdy = this.hdMax;
            this.hazard.size *= this.hAccel;
        }
        if (this.hazard.size > this.hsMax) {
            this.hazard.size = this.hsMax;
        }
    }
    checkCollisions() {
        this.entities.forEach((entity) => {
            const d1 = this.distance2(this.hazard.x, this.hazard.y, entity.x, entity.y);
            const d2 = (30 + this.hazard.size) * (30 + this.hazard.size);
            if (d1 < d2) {
                if (entity.shieldTime > 0) {
                    if (!entity.blockedThisShield) {
                        this.hdx = -(this.hdx * this.hAccel);
                        this.hdy = -(this.hdy * this.hAccel);
                        entity.blockedThisShield = true;
                    }
                }
                else {
                    this.server.in(this.roomId).emit(MessageTypes_1.default.ClientDied, entity.name);
                }
            }
            if (entity.shieldTime <= 0) {
                entity.blockedThisShield = false;
            }
        });
    }
    distance2(x1, y1, x2, y2) {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);
        return (dx * dx) + (dy * dy);
    }
    onClientTick(clientId, entity) {
        this.entities.set(clientId, entity);
    }
}
exports.default = GameRoom;
//# sourceMappingURL=GameRoom.js.map