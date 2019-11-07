"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
const DatabaseReturnStatus_1 = tslib_1.__importDefault(require("./DatabaseReturnStatus"));
class DatabaseService {
    constructor(url, database, collection) {
        this.dbUrl = url;
        this.dbName = database;
        this.colName = collection;
    }
    connect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.client) {
                    AmbientContext_1.default.LoggerProvider.info('Connecting to database instance.');
                    this.client = yield mongodb_1.MongoClient.connect(this.dbUrl, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    });
                    AmbientContext_1.default.LoggerProvider.info(`Connected to mongodb server.`);
                    this.database = this.client.db(this.dbName);
                    AmbientContext_1.default.LoggerProvider.info(`Got database instance.`);
                    this.collection = this.database.collection(this.colName);
                    AmbientContext_1.default.LoggerProvider.info(`Got collection instance.`);
                }
            }
            catch (error) {
                AmbientContext_1.default.LoggerProvider.crit(`Unable to connect to mongodb. Reason:${error}`);
            }
        });
    }
    getAccount(humanId, isEmail) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                yield this.connect();
            }
            try {
                const filter = {};
                if (isEmail) {
                    filter.email = humanId;
                }
                else {
                    filter.username = humanId;
                }
                this.collection.findOne(filter, (queryError, result) => {
                    if (queryError && result.email) {
                        AmbientContext_1.default.LoggerProvider.alert(`There was an error with the find. ${queryError}`);
                        reject('There was an error finding an entry.');
                    }
                    resolve(result);
                });
            }
            catch (generalError) {
                AmbientContext_1.default.LoggerProvider.alert(`There was a general error with the insert. ${generalError}`);
                reject(generalError.message || 'There was an unknown error in the Database Service when retrieving an account.');
            }
        }));
    }
    addAccount(user) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                yield this.connect();
            }
            try {
                const usernameLookupQuery = yield this.collection.findOne({ username: user.username });
                if (usernameLookupQuery) {
                    AmbientContext_1.default.LoggerProvider.info(`Found account with same username ${usernameLookupQuery.username}`);
                    resolve(DatabaseReturnStatus_1.default.UsernameTaken);
                    return;
                }
                const emailLookupQuery = yield this.collection.findOne({ email: user.email });
                if (emailLookupQuery) {
                    AmbientContext_1.default.LoggerProvider.info(`Found account with same email ${emailLookupQuery.email}`);
                    resolve(DatabaseReturnStatus_1.default.EmailTaken);
                    return;
                }
                const insertResult = yield this.collection.insertOne(user);
                if (insertResult.insertedCount === 1) {
                    resolve(DatabaseReturnStatus_1.default.Success);
                    return;
                }
            }
            catch (generalError) {
                AmbientContext_1.default.LoggerProvider.alert(`There was a general error with the insert. ${generalError}`);
                reject(generalError.message || 'There was an unknown error in the Database Service when adding an account.');
            }
        }));
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=DatabaseService.js.map