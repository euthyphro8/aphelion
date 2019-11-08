
// External Dependencies
import express from 'express';
import http from 'http';
import io from 'socket.io';

// Internal Dependencies
import IAuthResponse from '@/interfaces/IAuthResponse';
import Context from './AmbientContext';
import MessageTypes from '../utils/MessageTypes';
import IUserInfo from '@/interfaces/IUserInfo';
import IAccountInfo from '@/interfaces/IAccountInfo';
import DatabaseReturnStatus from '../utils/DatabaseReturnStatus';

class MessageService {

    private authed: Map<string, IUserInfo>;
    private messengers: Map<string, io.Socket>;

    constructor() {
        this.authed = new Map<string, IUserInfo>();
        this.messengers = new Map<string, io.Socket>();
    }

    public registerMessenger(clientId: string, messenger: io.Socket): void {
        this.messengers.set(clientId, messenger);

        messenger.on(MessageTypes.LoginRequest, this.onRequestLogin.bind(this));
        messenger.on(MessageTypes.RegisterRequest, this.onRequestRegister.bind(this));
        messenger.on(MessageTypes.AccountInfoRequest, this.onAccountInfoRequest.bind(this));
        messenger.on(MessageTypes.LeaderboardRequest, this.onLeaderBoardRequest.bind(this));
    }

    public unregisterMessenger(clientId: string): void {
        const messenger = this.messengers.get(clientId);
        if (messenger) {
            messenger.off(MessageTypes.LoginRequest, this.onRequestLogin.bind(this));
            messenger.off(MessageTypes.RegisterRequest, this.onRequestRegister.bind(this));
            messenger.off(MessageTypes.AccountInfoRequest, this.onAccountInfoRequest.bind(this));
            messenger.off(MessageTypes.LeaderboardRequest, this.onLeaderBoardRequest.bind(this));
            this.messengers.delete(clientId);
        }
    }

    private async onRequestLogin(clientId: string, humanId: string, isEmail: boolean, password: string, callback: (response: boolean) => void): Promise<void> {
        const account = await Context.DatabaseProvider.getAccount(humanId, isEmail);
        const hashed = await Context.CryptoProvider.hashPassword(password);
        if (account && account.password === hashed) {
            // First we scrub the hashed password from the entry effectively converting it into a user info object.
            delete account.password;
            // The authetication was successful, we can store the info in the users map to denote as such.
            this.authed.set(clientId, account as IUserInfo);
            callback(true);
        } else {
            callback(false);
        }
    }

    private async onRequestRegister(clientId: string, username: string, email: string, password: string, callback: (response: boolean) => void): Promise<void> {
        const hashed = await Context.CryptoProvider.hashPassword(password);
        const account = { username, email, password: hashed, score: 0, avatar: ''} as IAccountInfo;
        const result = await Context.DatabaseProvider.addAccount(account);
        if (result === DatabaseReturnStatus.Success && account && account.password === hashed) {
            // First we scrub the hashed password from the entry effectively converting it into a user info object.
            delete account.password;
            // The authetication was successful, we can store the info in the users map to denote as such.
            this.authed.set(clientId, account as IUserInfo);
            callback(true);
        } else {
            callback(false);
        }
    }

    private onAccountInfoRequest(clientId: string, callback: (info?: IUserInfo) => void): void {
        const user = this.authed.get(clientId);
        if (user) {
            callback(user as IUserInfo);
        } else {
            callback(undefined);
        }
    }

    private async onLeaderBoardRequest(clientId: string, callback: (entries: any) => void): Promise<void> {
        const user = this.authed.get(clientId);
        if (user) {
            const entries = await Context.DatabaseProvider.getAllAccounts();
            if (entries) {
                entries.forEach((entry) => delete entry.password);
                callback(entries);
                return;
            }
        }
        callback(undefined);
    }
}

export default MessageService;
