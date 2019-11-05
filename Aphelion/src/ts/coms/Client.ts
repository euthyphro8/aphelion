

import io from 'socket.io-client';
import uuid from 'uuid';

import MessageTypes from '@/ts/coms/MessageTypes';

import LeaderboardEntry from '@/ts/interfaces/ui/LeaderboardEntry';
import AccountInfo from '@/ts/interfaces/ui/AccountInfo';
import AuthResponse from './AuthResponse';


class Client {

    private id: string;
    private socket: SocketIOClient.Socket;

    constructor() {
        this.id = uuid.v4();

        const options = {
            autoConnect: false
        } as SocketIOClient.ConnectOpts;
        this.socket = io('http://localhost:3000', options);
        this.socket.on('connect', this.onConnected.bind(this));
        this.socket.connect();
    }

    private onConnected(): void {
        this.socket.emit('ID_NOT', this.id);
    }

    /**
     * Requests the server to use the authentication details to login.
     * @param humanId The username or email id
     * @param isEmail If the humanId is an email, if not it is assumed a username
     * @param password The password for the specified account.
     */
    public requestLogin(humanId: string, isEmail: boolean, password: string): Promise<AuthResponse> {
        return this.createRequest(MessageTypes.LoginRequest, humanId, isEmail, password);
    }

    /**
     *
     * @param username
     * @param email
     * @param password
     */
    public requestRegister(username: string, email: string, password: string): Promise<AuthResponse> {
        return this.createRequest(MessageTypes.RegisterRequest, username, email, password);
    }

    /**
     *
     */
    public requestLeaderBoards(): Promise<LeaderboardEntry[]> {
        return this.createRequest(MessageTypes.LeaderboardRequest);
    }

    /**
     *
     */
    public requestAccountInfo(): Promise<AccountInfo> {
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
