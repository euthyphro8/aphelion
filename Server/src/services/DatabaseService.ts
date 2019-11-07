
import mongodb, { InsertOneWriteOpResult, MongoClient, Db, Collection } from 'mongodb';
import IUserInfo from '@/interfaces/IUserInfo';
import assert from 'assert';
import Context from './AmbientContext';

class DatabaseService {

    private dbUrl: string;
    private dbName: string;
    private colName: string;
    private client?: MongoClient;
    private database?: Db;
    private collection?: Collection;

    constructor(url: string, database: string, collection: string) {
        this.dbUrl = url;
        this.dbName = database;
        this.colName = collection;
    }

    public async connect() {
        try {
            if (!this.client) {
                Context.LoggerProvider.debug('Connecting to database instance.');
                this.client = await MongoClient.connect(this.dbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                Context.LoggerProvider.debug(`Connected. ${this.client}`);
                this.database = this.client.db(this.dbName);
                Context.LoggerProvider.debug(`Got database. ${this.database}`);
                this.collection = this.database.collection(this.colName);
                Context.LoggerProvider.debug(`Got collection. ${this.collection}`);
            }
        } catch (error) {
            Context.LoggerProvider.crit(`Unable to connect to mongodb. Reason:${error}`);
        }
    }

    public getAccount(humanId: string, isEmail: boolean): Promise<IUserInfo> {
        return new Promise<IUserInfo>(async (resolve, reject) => {
            if (!this.client) {
                await this.connect();
            }
            try {
                const filter = {} as any;
                if (isEmail) {
                    filter.email = humanId;
                } else {
                    filter.username = humanId;
                }
                this.collection!.findOne(filter, (queryError: Error, result: any) => {
                    if (queryError && (result as IUserInfo).email) {
                        Context.LoggerProvider.alert(`There was an error with the find. ${queryError}`);
                        reject('There was an error finding an entry.');
                    }
                    resolve(result as IUserInfo);
                });
            } catch (generalError) {
                Context.LoggerProvider.alert(`There was a general error with the find. ${generalError}`);
                reject(generalError.message || 'There was an unknown error.');
            }
        });
    }

    public addAccount(user: IUserInfo): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            if (!this.client) {
                await this.connect();
            }
            try {
                this.collection!.insertOne([user], (insertError: Error) => {
                    if (insertError) {
                        Context.LoggerProvider.alert(`There was an error with the insert. ${insertError}`);
                        resolve(false);
                    }
                    resolve(true);
                });
            } catch (generalError) {
                Context.LoggerProvider.alert(`There was a general error with the insert. ${generalError}`);
                reject(generalError.message || 'There was an unknown error.');
            }
        });
    }

    // public getAccount(humanId: string, isEmail: boolean): Promise<IUserInfo> {
    //     return new Promise<IUserInfo>((resolve, reject) => {
    //         try {
    //             mongodb.MongoClient.connect(this.dbUrl, (connectionError: Error, client: mongodb.MongoClient) => {
    //                 if (connectionError) {
    //                     reject('Failed to establish connection to database.');
    //                 }
    //                 const filter = {} as any;
    //                 if (isEmail) {
    //                     filter.email = humanId;
    //                 } else {
    //                     filter.username = humanId;
    //                 }
    //                 const col = client.db(this.dbName).collection(this.colName);
    //                 col.findOne(filter, (queryError: Error, result: any) => {
    //                     if (queryError && (result as IUserInfo).email) {
    //                         reject('There was an error finding an entry.');
    //                     }
    //                     client.close();
    //                     resolve(result as IUserInfo);
    //                 });
    //             });
    //         } catch (generalError) {
    //             reject(generalError.message || 'There was an unknown error.');
    //         }
    //     });
    // }

    // public addAccount(user: IUserInfo): Promise<boolean> {
    //     return new Promise<boolean>((resolve, reject) => {
    //         try {
    //             mongodb.MongoClient.connect(this.dbUrl, (connectionError: Error, client: mongodb.MongoClient) => {
    //                 if (connectionError) {
    //                     reject('Failed to establish connection to database.');
    //                 }
    //                 const col = client.db(this.dbName).collection(this.colName);
    //                 col.insertOne([user], (insertError: Error, result: any) => {
    //                     if (insertError) {
    //                         resolve(false);
    //                     }
    //                     assert.equal(result.result.n, 1);
    //                     client.close();
    //                     resolve(true);
    //                 });
    //             });
    //         } catch (generalError) {
    //             reject(generalError.message || 'There was an unknown error.');
    //         }
    //     });
    // }
}

export default DatabaseService;
