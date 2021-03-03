"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
class CryptoService {
    constructor(saltRounds) {
        this.saltRounds = saltRounds;
    }
    VerifyAccount(humanId, isEmail, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                AmbientContext_1.default.LoggerProvider.info(`[ CRPT SVC ] Verifying account for ${humanId}.`);
                const account = yield AmbientContext_1.default.DatabaseProvider.getAccount(humanId, isEmail);
                if (account) {
                    AmbientContext_1.default.LoggerProvider.info(`[ CRPT SVC ] Found account record, comparing password.`);
                    if (yield bcrypt_1.default.compare(password, account.password)) {
                        AmbientContext_1.default.LoggerProvider.info(`[ CRPT SVC ] Account verification success.`);
                        return account;
                    }
                }
                AmbientContext_1.default.LoggerProvider.warn(`[ CRPT SVC ] Account verification failed.`);
            }
            catch (error) {
                AmbientContext_1.default.LoggerProvider.error(`[ CRPT SVC ] There was a general error while verifying a password ${error.message}`);
            }
            return null;
        });
    }
    VerifyPassword(storedHash, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.compare(password, storedHash);
            }
            catch (error) {
                AmbientContext_1.default.LoggerProvider.error(`[ CRPT SVC ] There was a general error while verifying a password ${error.message}`);
                return false;
            }
        });
    }
    hashPassword(password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(this.saltRounds);
                return yield bcrypt_1.default.hash(password, salt);
            }
            catch (error) {
                AmbientContext_1.default.LoggerProvider.error(`[ CRPT SVC ] There was a general error while hashing a password ${error.message}`);
                return null;
            }
        });
    }
}
exports.default = CryptoService;
//# sourceMappingURL=CryptoService.js.map