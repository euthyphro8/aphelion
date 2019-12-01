
import io from 'socket.io';
import IEntity from '@/interfaces/IEntity';
import MessageTypes from '../utils/MessageTypes';

class GameRoom {

    public roomId: string;
    private server: io.Server;
    private entities: Map<string, IEntity>;

    constructor(server: io.Server, roomId: string) {
        this.server = server;
        this.roomId = roomId;
        this.entities = new Map<string, IEntity>();
    }

    public addToRoom(clientId: string, socket: io.Socket): boolean {
        if (this.entities.size < 10) {
            const entity: IEntity = { x: 0, y: 0, hp: 100 };
            this.entities.set(clientId, entity);
            socket.join(this.roomId);
            socket.on(MessageTypes.ClientTick, this.onClientTick.bind(this));
            return true;
        }
        return false;
    }

    public removeFromRoom(clientId: string, socket: io.Socket): boolean {
        if (this.entities.has(clientId)) {
            this.entities.delete(clientId);
            socket.leave(this.roomId);
            socket.off(MessageTypes.ClientTick, this.onClientTick.bind(this));
            return true;
        }
        return false;
    }

    public tick(): void {
        this.server.in(this.roomId).emit(MessageTypes.ServerTick, Array.from(this.entities));
    }

    private onClientTick(clientId: string, entity: IEntity): void {
        this.entities.set(clientId, entity);
    }
}
export default GameRoom;
