
import { MongoClient, Db, Collection } from 'mongodb';
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

    public async connect(): Promise<void> {
        try {
            if (!this.client) {
                Context.LoggerProvider.info('[ DTBS SVC ] Connecting to database instance.');
                this.client = await MongoClient.connect(this.dbUrl, {
                    useNewUrlParser: true
                });
                Context.LoggerProvider.info(`[ DTBS SVC ] Connected to mongodb server.`);
                this.database = this.client.db(this.dbName);
                Context.LoggerProvider.info(`[ DTBS SVC ] Got database instance.`);
                this.collection = this.database.collection(this.colName);
                Context.LoggerProvider.info(`[ DTBS SVC ] Got collection instance.`);
            }
        } catch (error) {
            Context.LoggerProvider.crit(`[ DTBS SVC ] Unable to connect to mongodb. Reason:${error}`);
        }
    }

    /**
     * Simply adds in a new user account provided one with the same username or email cannot be found.
     * @param user The user info to be added.
     */
    public async addAccount(user: IAccountInfo): Promise<DatabaseReturnStatus> {
        if (!this.client) {
            await this.connect();
        }
        try {
            Context.LoggerProvider.info(`[ DTBS SVC ] Add account request for ${JSON.stringify(user)}`);
            // If an account with the same username already exists
            const usernameQuery = await this.collection!.findOne({ username: user.username });
            if (usernameQuery) {
                Context.LoggerProvider.info(`[ DTBS SVC ] Found account with same username ${JSON.stringify(usernameQuery)}`);
                return DatabaseReturnStatus.UsernameTaken;
            }
            // If an account with the same email already exists
            const emailQuery = await this.collection!.findOne({ email: user.email });
            if (emailQuery) {
                Context.LoggerProvider.info(`[ DTBS SVC ] Found account with same email ${(emailQuery as IAccountInfo).email}`);
                return DatabaseReturnStatus.EmailTaken;
            }
            // Otherwise insert into the database
            const insertResult = await this.collection!.insertOne(user);
            if (insertResult.insertedCount === 1) {
                return DatabaseReturnStatus.Success;
            }
        } catch (generalError) {
            Context.LoggerProvider.error(`[ DTBS SVC ] There was a general error with the insert. ${generalError.message || generalError}`);
        }
        return DatabaseReturnStatus.Failure;
    }

    /**
     * Finds a user account based on the provided email, and updates it.
     * @param user The user info to be updated.
     */
    public async updateAccount(user: IAccountInfo): Promise<DatabaseReturnStatus> {
        if (!this.client) {
            await this.connect();
        }
        try {
            const replaceResult = await this.collection!.findOneAndReplace({email: user.email}, user);
            if (replaceResult.ok) {
                return DatabaseReturnStatus.Success;
            }
        } catch (generalError) {
            Context.LoggerProvider.error(`[ DTBS SVC ] There was a general error with the insert. ${generalError.message || generalError}`);
        }
        return DatabaseReturnStatus.Failure;
    }

    /**
     * Finds a user account based on the provided email, and returns it.
     * @param humanId The username or email.
     * @param isEmail Whether the human id is an email address, if not username will be assumed.
     */
    public async getAccount(humanId: string, isEmail: boolean): Promise<IAccountInfo | null> {
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
            return (await this.collection!.findOne(filter)) as IAccountInfo;
        } catch (generalError) {
            Context.LoggerProvider.error(`[ DTBS SVC ] There was a general error with the insert. ${generalError.message || generalError}`);
            return null;
        }
    }

    public async getAllAccounts(): Promise<IAccountInfo[] | null> {
        if (!this.client) {
            await this.connect();
        }
        try {
            const raw = await this.collection!.find({}).toArray();
            const accounts: IAccountInfo[] = [];
            for (const account of raw) {
                if (account as IAccountInfo) {
                    accounts.push(account as IAccountInfo);
                } else {
                    Context.LoggerProvider.warn(`[ DTBS SVC ] Found an non AccountInfo entry while getting all accounts. ${JSON.stringify(account)}`);
                }
            }
            return accounts;
        } catch (generalError) {
            Context.LoggerProvider.error(`[ DTBS SVC ] There was a general error with the insert. ${generalError.message || generalError}`);
            return null;
        }
    }
}

export default DatabaseService;
