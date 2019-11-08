"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
class CryptoService {
    constructor(saltRounds) {
        this.saltRounds = saltRounds;
    }
    verifyPassword(humanId, isEmail, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield AmbientContext_1.default.DatabaseProvider.getAccount(humanId, isEmail);
                if (account) {
                    return yield bcrypt_1.default.compare(password, account.password);
                }
                return false;
            }
            catch (error) {
                AmbientContext_1.default.LoggerProvider.error(`There was a general error while verifying a password ${error.message}`);
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
                AmbientContext_1.default.LoggerProvider.error(`There was a general error while hashing a password ${error.message}`);
                return null;
            }
        });
    }
}
exports.default = CryptoService;
//# sourceMappingURL=CryptoService.js.map