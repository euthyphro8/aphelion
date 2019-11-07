
import mongodb, { InsertOneWriteOpResult, MongoClient, Db, Collection } from 'mongodb';
import IUserInfo from '@/interfaces/IUserInfo';
import assert from 'assert';
import Context from './AmbientContext';
import DatabaseReturnStatus from '../utils/DatabaseReturnStatus';
import IAccountInfo from '@/interfaces/IAccountInfo';

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
                Context.LoggerProvider.info('Connecting to database instance.');
                this.client = await MongoClient.connect(this.dbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                Context.LoggerProvider.info(`Connected to mongodb server.`);
                this.database = this.client.db(this.dbName);
                Context.LoggerProvider.info(`Got database instance.`);
                this.collection = this.database.collection(this.colName);
                Context.LoggerProvider.info(`Got collection instance.`);
            }
        } catch (error) {
            Context.LoggerProvider.crit(`Unable to connect to mongodb. Reason:${error}`);
        }
    }

    /**
     * Simply adds in a new user account provided one with the same username or email cannot be found.
     * @param user The user info to be added.
     */
    public addAccount(user: IAccountInfo): Promise<DatabaseReturnStatus> {
        return new Promise<DatabaseReturnStatus>(async (resolve, reject) => {
            if (!this.client) {
                await this.connect();
            }
            try {
                // If an account with the same username already exists
                const usernameQuery = await this.collection!.findOne({ username: user.username });
                if (usernameQuery) {
                    Context.LoggerProvider.info(`Found account with same username ${(usernameQuery as IAccountInfo).username}`);
                    resolve(DatabaseReturnStatus.UsernameTaken);
                    return;
                }
                // If an account with the same eamil already exists
                const emailQuery = await this.collection!.findOne({ email: user.email });
                if (emailQuery) {
                    Context.LoggerProvider.info(`Found account with same email ${(emailQuery as IAccountInfo).email}`);
                    resolve(DatabaseReturnStatus.EmailTaken);
                    return;
                }
                // Otherwise insert into the database
                const insertResult = await this.collection!.insertOne(user);
                if (insertResult.insertedCount === 1) {
                    resolve(DatabaseReturnStatus.Success);
                } else {
                    resolve(DatabaseReturnStatus.Failure);
                }
            } catch (generalError) {
                Context.LoggerProvider.alert(`There was a general error with the insert. ${generalError.message || generalError}`);
                reject(generalError.message || 'There was an unknown error in the Database Service when adding an account.');
            }
        });
    }

    /**
     * Finds a user account based on the provided email, and updates it.
     * @param user The user info to be updated.
     */
    public updateAccount(user: IAccountInfo): Promise<DatabaseReturnStatus> {
        return new Promise<DatabaseReturnStatus>(async (resolve, reject) => {
            if (!this.client) {
                await this.connect();
            }
            try {
                const replaceResult = await this.collection!.findOneAndReplace({email: user.email}, user);
                if (replaceResult.ok) {
                    resolve(DatabaseReturnStatus.Success);
                } else {
                    resolve(DatabaseReturnStatus.Failure);
                }
            } catch (generalError) {
                Context.LoggerProvider.alert(`There was a general error with the insert. ${generalError.message || generalError}`);
                reject(generalError.message || 'There was an unknown error in the Database Service when adding an account.');
            }
        });
    }

    /**
     * Finds a user account based on the provided email, and returns it.
     * @param humanId The username or email.
     * @param isEmail Whether the human id is an email address, if not username will be assumed.
     */
    public getAccount(humanId: string, isEmail: boolean): Promise<IAccountInfo> {
        return new Promise<IAccountInfo>(async (resolve, reject) => {
            if (!this.client) {
                await this.connect();
            }
            try {
                // Create the filter for our query
                const filter = {} as any;
                if (isEmail) {
                    filter.email = humanId;
                } else {
                    filter.username = humanId;
                }
                // Return whatever comes back, the caller should handle null exceptions
                resolve((await this.collection!.findOne(filter)) as IAccountInfo);
            } catch (generalError) {
                Context.LoggerProvider.alert(`There was a general error with the insert. ${generalError.message || generalError}`);
                reject(generalError.message || 'There was an unknown error in the Database Service when retrieving an account.');
            }
        });
    }

    public getAllAccounts(): Promise<IAccountInfo[]> {        
        return new Promise<IAccountInfo[]>(async (resolve, reject) => {
            if (!this.client) {
                await this.connect();
            }
            try {
                const cursor = this.collection!.find({});
                // cursor.
            } catch (generalError) {
                Context.LoggerProvider.alert(`There was a general error with the insert. ${generalError.message || generalError}`);
                reject(generalError.message || 'There was an unknown error in the Database Service when retrieving an account.');
            }
        });
    }
}

export default DatabaseService;
