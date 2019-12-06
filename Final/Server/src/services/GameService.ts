
import io from 'socket.io';
import MessageTypes from '../utils/MessageTypes';
import GameRoom from '../utils/GameRoom';
import AmbientContext from './AmbientContext';
import IAccountInfo from '@/interfaces/IAccountInfo';

class GameService {

    private rooms: GameRoom[];
    private gamers: Map<string, io.Socket>;
    private requestId: NodeJS.Timeout | null;
    private stepTime: number;
    private lastRoomNumber: number;

    constructor() {
        this.gamers = new Map<string, io.Socket>();
        this.rooms = [];
        this.stepTime = (1000.0 / 30.0);
        this.lastRoomNumber = 0;
        this.requestId = null;
    }

    public getPlayerCount(): number {
        return this.gamers.size;
    }

    public registerGamer(clientId: string, gamer: io.Socket): string {
        this.gamers.set(clientId, gamer);
        gamer.on(MessageTypes.LeaveRoomRequest, this.onLeaveRoomRequest.bind(this));
        // Try to add the client to an existing room
        let roomId = '';
        for (const room of this.rooms) {
            if (room.addToRoom(clientId, gamer)) {
                roomId = room.roomId;
                break;
            }
        }
        // Otherwise create a new room and add it to that
        if (!roomId) {
            const server = AmbientContext.ConnectionProvider.ioServer;
            roomId = `Aphelion-${++this.lastRoomNumber}`;
            const room = new GameRoom(server, roomId);
            room.addToRoom(clientId, gamer);
            this.rooms.push(room);
        }
        // Start the ticks if not already started
        if (!this.requestId) {
            this.requestId = setInterval(this.tick.bind(this), this.stepTime);
        }
        return roomId;
    }

    public unregisterGamer(clientId: string): void {
        const gamer = this.gamers.get(clientId);
        if (gamer) {
            this.gamers.delete(clientId);
            // Try to remove the client from the room it was in
            for (const room of this.rooms) {
                if (room.removeFromRoom(clientId, gamer!)) {
                    break;
                }
            }

            // Stop the ticks if no clients are playing
            if (this.gamers.size === 0 && this.requestId) {
                clearInterval(this.requestId!);
                this.requestId = null;
            }
        }
    }

    private onLeaveRoomRequest(clientId: string, username: string, finalScore: number): void {
        AmbientContext.DatabaseProvider.getAccount(username, false).then((account: IAccountInfo | null) => {
            if (account) {
                account.score += finalScore;
                AmbientContext.DatabaseProvider.updateAccount(account);
            }
        });
        this.unregisterGamer(clientId);
    }

    private tick(): void {
        this.rooms.forEach((room) => room.tick());
    }

}
export default GameService;
