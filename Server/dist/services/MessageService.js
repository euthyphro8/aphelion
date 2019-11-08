"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
const MessageTypes_1 = tslib_1.__importDefault(require("../utils/MessageTypes"));
const DatabaseReturnStatus_1 = tslib_1.__importDefault(require("../utils/DatabaseReturnStatus"));
class MessageService {
    constructor() {
        this.authed = new Map();
        this.messengers = new Map();
    }
    registerMessenger(clientId, messenger) {
        this.messengers.set(clientId, messenger);
        messenger.on(MessageTypes_1.default.LeaderboardRequest, this.onRequestLogin.bind(this));
        messenger.on(MessageTypes_1.default.LeaderboardRequest, this.onRequestRegister.bind(this));
        messenger.on(MessageTypes_1.default.AccountInfoRequest, this.onAccountInfoRequest.bind(this));
    }
    onRequestLogin(clientId, humanId, isEmail, password, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const account = yield AmbientContext_1.default.DatabaseProvider.getAccount(humanId, isEmail);
            const hashed = yield AmbientContext_1.default.CryptoProvider.hashPassword(password);
            if (account && account.password === hashed) {
                delete account.password;
                this.authed.set(clientId, account);
                callback(true);
            }
            else {
                callback(false);
            }
        });
    }
    onRequestRegister(clientId, username, email, password, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const hashed = yield AmbientContext_1.default.CryptoProvider.hashPassword(password);
            const account = { username, email, password: hashed, score: 0, avatar: '' };
            const result = yield AmbientContext_1.default.DatabaseProvider.addAccount(account);
            if (result === DatabaseReturnStatus_1.default.Success && account && account.password === hashed) {
                delete account.password;
                this.authed.set(clientId, account);
                callback(true);
            }
            else {
                callback(false);
            }
        });
    }
    onAccountInfoRequest(clientId, callback) {
        const user = this.authed.get(clientId);
        if (user) {
            callback(user);
        }
        else {
            callback(undefined);
        }
    }
}
exports.default = MessageService;
//# sourceMappingURL=MessageService.js.map