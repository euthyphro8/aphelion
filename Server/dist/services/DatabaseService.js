"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const AmbientContext_1 = tslib_1.__importDefault(require("./AmbientContext"));
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
                    AmbientContext_1.default.LoggerProvider.debug('Connecting to database instance.');
                    this.client = yield mongodb_1.MongoClient.connect(this.dbUrl, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    });
                    AmbientContext_1.default.LoggerProvider.debug(`Connected. ${this.client}`);
                    this.database = this.client.db(this.dbName);
                    AmbientContext_1.default.LoggerProvider.debug(`Got database. ${this.database}`);
                    this.collection = this.database.collection(this.colName);
                    AmbientContext_1.default.LoggerProvider.debug(`Got collection. ${this.collection}`);
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
                AmbientContext_1.default.LoggerProvider.alert(`There was a general error with the find. ${generalError}`);
                reject(generalError.message || 'There was an unknown error.');
            }
        }));
    }
    addAccount(user) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                yield this.connect();
            }
            try {
                this.collection.insertOne([user], (insertError) => {
                    if (insertError) {
                        AmbientContext_1.default.LoggerProvider.alert(`There was an error with the insert. ${insertError}`);
                        resolve(false);
                    }
                    resolve(true);
                });
            }
            catch (generalError) {
                AmbientContext_1.default.LoggerProvider.alert(`There was a general error with the insert. ${generalError}`);
                reject(generalError.message || 'There was an unknown error.');
            }
        }));
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=DatabaseService.js.map