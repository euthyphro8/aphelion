

import io from 'socket.io-client';
import uuid from 'uuid';

import MessageTypes from '@/ts/coms/MessageTypes';
import IUserInfo from '@/ts/interfaces/ui/IUserInfo';


class Client {

    private id: string;
    private socket: SocketIOClient.Socket;
    private connected: boolean;

    constructor() {
        this.id = uuid.v4();
        this.connected = false;
        const options: SocketIOClient.ConnectOpts = {
            autoConnect: false
        };
        this.socket = io('http://192.168.1.246:3000', options);
        this.socket.on('connect', this.onConnected.bind(this));
        this.socket.on(MessageTypes.IdRequest, (callback: (clientId: string) => void) => {
            callback(this.id);
        });
        this.socket.connect();
    }

    private onConnected(): void {
        this.connected = true;
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

    private createRequest<T>(type: MessageTypes, ...params: any[]): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            try {
                this.socket.emit(type, this.id, ...params,
                    (rejected: boolean, result: T) => {
                        if (rejected) {
                            reject('Server rejected the request.');
                        }
                        resolve(result);
                    }
                );
            } catch (error) {
                reject(error.message);
            }
        });
        return promise;
    }
}

export default Client;
