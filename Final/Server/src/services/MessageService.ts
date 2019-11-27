
// External Dependencies
import io from 'socket.io';

// Internal Dependencies
import Context from './AmbientContext';
import MessageTypes from '../utils/MessageTypes';
import IUserInfo from '@/interfaces/IUserInfo';
import IAccountInfo from '@/interfaces/IAccountInfo';
import DatabaseReturnStatus from '../utils/DatabaseReturnStatus';

class MessageService {

    private authenticated: Map<string, IUserInfo>;
    private messengers: Map<string, io.Socket>;

    constructor() {
        this.authenticated = new Map<string, IUserInfo>();
        this.messengers = new Map<string, io.Socket>();
    }

    public getActiveUsers(): number {
        return this.messengers.size;
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
        Context.LoggerProvider.info(`[ MESG SVC ] Got login request for ${humanId}`);
        const account = await Context.CryptoProvider.VerifyAccount(humanId, isEmail, password);
        if (account) {
            Context.LoggerProvider.info(`[ MESG SVC ] Got verified account back, storing as authenticated and responding to client.`);
            // First we scrub the hashed password from the entry effectively converting it into a user info object.
            delete account.password;
            // The authentication was successful, we can store the info in the users map to denote as such.
            this.authenticated.set(clientId, account as IUserInfo);
            callback(true);
        } else {
            Context.LoggerProvider.info(`[ MESG SVC ] Verification failed, notifying client.`);
            callback(false);
        }
    }

    private async onRequestRegister(clientId: string, username: string, email: string, password: string, callback: (response: boolean) => void): Promise<void> {
        Context.LoggerProvider.info(`[ MESG SVC ] Got register request for ${email}.`);
        const hashed = await Context.CryptoProvider.hashPassword(password);
        if (hashed) {
            const account: IAccountInfo = { username, email, password: hashed, score: 0, avatar: email};
            const result = await Context.DatabaseProvider.addAccount(account);
            if (result === DatabaseReturnStatus.Success) {
                Context.LoggerProvider.info(`[ MESG SVC ] Registration succeeded for ${email}.`);
                // First we scrub the hashed password from the entry effectively converting it into a user info object.
                delete account.password;
                // The authentication was successful, we can store the info in the users map to denote as such.
                this.authenticated.set(clientId, account as IUserInfo);
                callback(true);
            } else {
                Context.LoggerProvider.info(`[ MESG SVC ] Registration failed for ${email}, with database error, ${result}.`);
                callback(false);
            }
        } else {
            Context.LoggerProvider.info(`[ MESG SVC ] Registration failed for ${email}.`);
            callback(false);
        }
    }

    private onAccountInfoRequest(clientId: string, callback: (info?: IUserInfo) => void): void {
        Context.LoggerProvider.info(`[ MESG SVC ] Got account info request, ${clientId}`);
        const user = this.authenticated.get(clientId);
        if (user) {
            callback(user as IUserInfo);
        } else {
            callback(undefined);
        }
    }

    private async onLeaderBoardRequest(clientId: string, callback: (entries: any) => void): Promise<void> {
        Context.LoggerProvider.info(`[ MESG SVC ] Got leaderboard request, ${clientId}`);
        const user = this.authenticated.get(clientId);
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
