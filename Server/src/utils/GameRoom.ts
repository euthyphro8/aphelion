
import io from 'socket.io';
import IEntity from '@/interfaces/IEntity';
import MessageTypes from '../utils/MessageTypes';
import IHazard from '@/interfaces/IHazard';
import AmbientContext from '../services/AmbientContext';

class GameRoom {

    public roomId: string;
    private server: io.Server;
    private hazard: IHazard;
    private entities: Map<string, IEntity>;

    private hdx: number;
    private hdy: number;

    private readonly hAccel: number = 1.1;
    private readonly hdMax: number = 100;
    private readonly hsMax: number = 200;

    constructor(server: io.Server, roomId: string) {
        this.server = server;
        this.roomId = roomId;
        this.entities = new Map<string, IEntity>();
        this.hazard = {
            x: 1920 / 2,
            y: 1080 / 2,
            size: 70
        };
        this.hdx = ((Math.random() * 10) + 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
        this.hdy = ((Math.random() * 10) + 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
    }

    public hasPlayers(): boolean {
        return this.entities.size !== 0;
    }

    public addToRoom(clientId: string, socket: io.Socket): boolean {
        if (this.entities.size < 10) {
            const entity: IEntity = { x: 0, y: 0, name: 'New User', rechargeTime: 0, shieldTime: 0, blockedThisShield: false };
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

            if (this.entities.size <= 0) {
                this.reset();
            }
            return true;
        }
        return false;
    }

    public tick(): void {
        if (this.entities.size > 0) {
            this.updateHazard();
            this.checkCollisions();
            this.server.in(this.roomId).emit(MessageTypes.ServerTick, this.hazard, Array.from(this.entities));
        } else {
            this.reset();
        }
    }

    public reset(): void {
        AmbientContext.LoggerProvider.debug(`[GameRoom] Room ${this.roomId} reset.`);
        this.hazard = {
            x: 1920 / 2,
            y: 1080 / 2,
            size: 70
        };
        this.hdx = ((Math.random() * 10) + 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
        this.hdy = ((Math.random() * 10) + 5) * (Math.random() - 0.5 > 0 ? 1 : -1);
    }

    private updateHazard(): void {
        this.hazard.x += this.hdx;
        this.hazard.y += this.hdy;
        if (this.hazard.x > 1920 - (this.hazard.size)) {
            this.hazard.x = 1920 - (this.hazard.size);
            this.hdx = -(this.hdx * this.hAccel);
        } else if (this.hazard.x < 0 + (this.hazard.size)) {
            this.hazard.x = 0 + (this.hazard.size);
            this.hdx = -(this.hdx * this.hAccel);
        }

        if (this.hazard.y > 1080 - (this.hazard.size)) {
            this.hazard.y = 1080 - (this.hazard.size);
            this.hdy = -(this.hdy * this.hAccel);
        } else if (this.hazard.y < 0 + (this.hazard.size)) {
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

    private checkCollisions(): void {
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
                } else {
                    this.server.in(this.roomId).emit(MessageTypes.ClientDied, entity.name);
                }
            }
            if (entity.shieldTime <= 0) {
                entity.blockedThisShield = false;
            }
        });
    }

    private distance2(x1: number, y1: number, x2: number, y2: number): number {
        const dx = Math.abs(x1 - x2);
        const dy = Math.abs(y1 - y2);
        return (dx * dx) + (dy * dy);
    }

    private onClientTick(clientId: string, entity: IEntity): void {
        this.entities.set(clientId, entity);
    }
}
export default GameRoom;
