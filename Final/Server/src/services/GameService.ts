
import io from 'socket.io';

class GameService {
    private gamers: Map<string, io.Socket>;

    constructor() {
        this.gamers = new Map<string, io.Socket>();
    }

    public registerGamer(clientId: string, gamer: io.Socket): void {
        this.gamers.set(clientId, gamer);
    }

    public unregisterMessenger(clientId: string): void {
        if (this.gamers.has(clientId)) {
            this.gamers.delete(clientId);
        }
    }
}
export default GameService;
