"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
const MessageTypes_1 = tslib_1.__importDefault(require("../utils/MessageTypes"));
const DatabaseReturnStatus_1 = tslib_1.__importDefault(require("../utils/DatabaseReturnStatus"));
class MessageService {
    constructor() {
        this.authenticated = new Map();
        this.messengers = new Map();
    }
    registerMessenger(clientId, messenger) {
        this.messengers.set(clientId, messenger);
        messenger.on(MessageTypes_1.default.LoginRequest, this.onRequestLogin.bind(this));
        messenger.on(MessageTypes_1.default.RegisterRequest, this.onRequestRegister.bind(this));
        messenger.on(MessageTypes_1.default.AccountInfoRequest, this.onAccountInfoRequest.bind(this));
        messenger.on(MessageTypes_1.default.LeaderboardRequest, this.onLeaderBoardRequest.bind(this));
    }
    unregisterMessenger(clientId) {
        const messenger = this.messengers.get(clientId);
        if (messenger) {
            messenger.off(MessageTypes_1.default.LoginRequest, this.onRequestLogin.bind(this));
            messenger.off(MessageTypes_1.default.RegisterRequest, this.onRequestRegister.bind(this));
            messenger.off(MessageTypes_1.default.AccountInfoRequest, this.onAccountInfoRequest.bind(this));
            messenger.off(MessageTypes_1.default.LeaderboardRequest, this.onLeaderBoardRequest.bind(this));
            this.messengers.delete(clientId);
        }
    }
    onRequestLogin(clientId, humanId, isEmail, password, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            AmbientContext_1.default.LoggerProvider.info(`[ MESG SVC ] Got login request for ${humanId}`);
            const account = yield AmbientContext_1.default.CryptoProvider.VerifyAccount(humanId, isEmail, password);
            if (account) {
                AmbientContext_1.default.LoggerProvider.info(`[ MESG SVC ] Got verified account back, storing as authenticated and responding to client.`);
                delete account.password;
                this.authenticated.set(clientId, account);
                callback(true);
            }
            else {
                AmbientContext_1.default.LoggerProvider.info(`[ MESG SVC ] Verification failed, notifying client.`);
                callback(false);
            }
        });
    }
    onRequestRegister(clientId, username, email, password, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            AmbientContext_1.default.LoggerProvider.info(`[ MESG SVC ] Got register request for ${email}.`);
            const hashed = yield AmbientContext_1.default.CryptoProvider.hashPassword(password);
            if (hashed) {
                const account = { username, email, password: hashed, score: 0, avatar: email };
                const result = yield AmbientContext_1.default.DatabaseProvider.addAccount(account);
                if (result === DatabaseReturnStatus_1.default.Success) {
                    AmbientContext_1.default.LoggerProvider.info(`[ MESG SVC ] Registration succeeded for ${email}.`);
                    delete account.password;
                    this.authenticated.set(clientId, account);
                    callback(true);
                }
                else {
                    AmbientContext_1.default.LoggerProvider.info(`[ MESG SVC ] Registration failed for ${email}, with database error, ${result}.`);
                    callback(false);
                }
            }
            else {
                AmbientContext_1.default.LoggerProvider.info(`[ MESG SVC ] Registration failed for ${email}.`);
                callback(false);
            }
        });
    }
    onAccountInfoRequest(clientId, callback) {
        AmbientContext_1.default.LoggerProvider.info(`[ MESG SVC ] Got account info request, ${clientId}`);
        const user = this.authenticated.get(clientId);
        if (user) {
            callback(user);
        }
        else {
            callback(undefined);
        }
    }
    onLeaderBoardRequest(clientId, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            AmbientContext_1.default.LoggerProvider.info(`[ MESG SVC ] Got leaderboard request, ${clientId}`);
            const user = this.authenticated.get(clientId);
            if (user) {
                const entries = yield AmbientContext_1.default.DatabaseProvider.getAllAccounts();
                if (entries) {
                    entries.forEach((entry) => delete entry.password);
                    callback(entries);
                    return;
                }
            }
            callback(undefined);
        });
    }
}
exports.default = MessageService;
//# sourceMappingURL=MessageService.js.map