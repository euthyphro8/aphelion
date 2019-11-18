"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameService {
    constructor() {
        this.gamers = new Map();
    }
    registerGamer(clientId, gamer) {
        this.gamers.set(clientId, gamer);
    }
    unregisterMessenger(clientId) {
        if (this.gamers.has(clientId)) {
            this.gamers.delete(clientId);
        }
    }
}
exports.default = GameService;
//# sourceMappingURL=GameService.js.map