
import mongodb, { InsertOneWriteOpResult } from 'mongodb';
import IUserInfo from '@/interfaces/IUserInfo';
import assert from 'assert';

class DatabaseService {

    public static readonly CONNECTION_ERROR = ;
    public static readonly GENERAL_ERROR = ;

    private dbUrl: string;
    private dbName: string;
    private colName: string;

    constructor(url: string, database: string, collection: string) {
        this.dbUrl = url;
        this.dbName = database;
        this.colName = collection;
    }

    public getAccount(humanId: string, isEmail: boolean): Promise<IUserInfo> {
        return new Promise<IUserInfo>((resolve, reject) => {
            try {
                mongodb.MongoClient.connect(this.dbUrl, (connectionError: Error, client: mongodb.MongoClient) => {
                    if (connectionError) {
                        reject('Failed to establish connection to database.');
                    }
                    const filter = {} as any;
                    if (isEmail) {
                        filter.email = humanId;
                    } else {
                        filter.username = humanId;
                    }
                    const col = client.db(this.dbName).collection(this.colName);
                    col.findOne(filter, (queryError: Error, result: any) => {
                        if (queryError && (result as IUserInfo).email) {
                            reject('There was an error finding an entry.');
                        }
                        client.close();
                        resolve(result as IUserInfo);
                    });
                });
            } catch (generalError) {
                reject(generalError.message || 'There was an unknown error.');
            }
        });
    }

    public addAccount(user: IUserInfo): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                mongodb.MongoClient.connect(this.dbUrl, (connectionError: Error, client: mongodb.MongoClient) => {
                    if (connectionError) {
                        reject('Failed to establish connection to database.');
                    }
                    const col = client.db(this.dbName).collection(this.colName);
                    col.insertOne([user], (insertError: Error, result: any) => {
                        if (insertError) {
                            resolve(false);
                        }
                        assert.equal(result.result.n, 1);
                        client.close();
                        resolve(true);
                    });
                });
            } catch (generalError) {
                reject(generalError.message || 'There was an unknown error.');
            }
        });
    }
}

export default DatabaseService;
