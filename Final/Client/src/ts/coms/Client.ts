

import io from 'socket.io-client';
import uuid from 'uuid';
// import certificate from 'cert';

import MessageTypes from '@/ts/coms/MessageTypes';
import IUserInfo from '@/ts/interfaces/ui/IUserInfo';
import IEntity from '@/ts/interfaces/IEntity';

class Client {

    public id: string;
    private roomId: string;
    private socket: SocketIOClient.Socket;
    private connected: boolean;

    constructor() {
        this.id = uuid.v4();
        this.connected = false;
        const options: SocketIOClient.ConnectOpts = {
            autoConnect: false,
            // ca: fs.readFileSync('server-certifcate.pem').toString(),
            // ca: certificate,
        };
        this.socket = io('http://localhost:3000', options);
        this.socket.on('connect', this.onConnected.bind(this));
        this.socket.on(MessageTypes.IdRequest, (callback: (clientId: string) => void) => {
            callback(this.id);
        });
        this.socket.connect();
        this.roomId = '';
    }

    private onConnected(): void {
        this.connected = true;
    }

    public isConnected(): boolean {
        return this.connected;
    }

    /**
     * Requests the server to use the authentication details to login.
     * @param humanId The username or email id
     * @param isEmail If the humanId is an email, if not it is assumed a username
     * @param password The password for the specified account.
     */
    public requestLogin(humanId: string, isEmail: boolean, password: string): Promise<boolean> {
        return this.createRequest(MessageTypes.LoginRequest, humanId, isEmail, password);
    }

    /**
     *
     * @param username
     * @param email
     * @param password
     */
    public requestRegister(username: string, email: string, password: string): Promise<boolean> {
        return this.createRequest(MessageTypes.RegisterRequest, username, email, password);
    }

    /**
     *
     */
    public requestLeaderBoards(): Promise<IUserInfo[]> {
        return this.createRequest(MessageTypes.LeaderboardRequest);
    }

    /**
     *
     */
    public requestAccountInfo(): Promise<IUserInfo> {
        return this.createRequest(MessageTypes.AccountInfoRequest);
    }

    /**
     *
     */
    public requestRoom(): Promise<string> {
        return this.createRequest(MessageTypes.RoomRequest);
    }

    private createRequest<T>(type: MessageTypes, ...params: any[]): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            try {
                this.socket.emit(type, this.id, ...params,
                    (result: T) => {
                        resolve(result);
                    }
                );
            } catch (error) {
                reject(error.message);
            }
        });
        return promise;
    }

    public subscribeToRoom(callback: (entities: [string, IEntity][]) => void): void {
        this.requestRoom().then((roomId) => {
            console.log(`[ Client ] Subscribed to room ${roomId}.`);
            this.socket.on(MessageTypes.ServerTick, callback);
        });
    }

    public unSubscribeToRoom(callback: (entities: [string, IEntity][]) => void): void {
        this.socket.emit(MessageTypes.LeaveRoomRequest, this.id);
        this.socket.off(MessageTypes.ServerTick, callback);
    }

    public sendClientTick(entity: IEntity) {
        this.socket.emit(MessageTypes.ClientTick, this.id, entity);
    }
}

export default Client;
