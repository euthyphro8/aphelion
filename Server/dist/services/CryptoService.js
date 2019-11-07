"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
class CryptoService {
    constructor(salt) {
        this.salt = salt;
    }
    registerNewUser(username, email, password) {
        return bcrypt_1.default.hash(password, this.salt).then((hash) => {
            const user = {
                username: username,
                email: email,
                password: hash,
                score: 0
            };
            return AmbientContext_1.default.DatabaseProvider.addAccount(user)
                .catch((error) => {
                AmbientContext_1.default.LoggerProvider.error(error.message);
                return false;
            });
        });
    }
    verifyPassword(humanId, isEmail, password) {
        return bcrypt_1.default.hash(password, this.salt).then((hash) => {
            return AmbientContext_1.default.DatabaseProvider.getAccount(humanId, isEmail).then((user) => {
                return (user.password === hash);
            }).catch((error) => {
                AmbientContext_1.default.LoggerProvider.error(error.message);
                return false;
            });
        });
    }
}
exports.default = CryptoService;
//# sourceMappingURL=CryptoService.js.map