
import bcrypt from 'bcrypt';
import Context from './AmbientContext';
import IAccountInfo from '@/interfaces/IAccountInfo';

class CryptoService {

    private saltRounds: number;

    constructor(saltRounds: number) {
        this.saltRounds = saltRounds;
    }

    public async VerifyAccount(humanId: string, isEmail: boolean, password: string): Promise<IAccountInfo | null> {
        try {
            Context.LoggerProvider.info(`[ CRPT SVC ] Verifying account for ${humanId}.`);
            const account = await Context.DatabaseProvider.getAccount(humanId, isEmail);
            if (account) {
                Context.LoggerProvider.info(`[ CRPT SVC ] Found account record, comparing password.`);
                if (await bcrypt.compare(password, account.password)) {
                    Context.LoggerProvider.info(`[ CRPT SVC ] Account verification success.`);
                    return account;
                }
            }
            Context.LoggerProvider.warn(`[ CRPT SVC ] Account verification failed.`);
        } catch (error) {
            Context.LoggerProvider.error(`[ CRPT SVC ] There was a general error while verifying a password ${error.message}`);
        }
        return null;
    }

    public async VerifyPassword(storedHash: string, password: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, storedHash);
        } catch (error) {
            Context.LoggerProvider.error(`[ CRPT SVC ] There was a general error while verifying a password ${error.message}`);
            return false;
        }
    }

    public async hashPassword(password: string): Promise<string | null> {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            Context.LoggerProvider.error(`[ CRPT SVC ] There was a general error while hashing a password ${error.message}`);
            return null;
        }
    }
}

export default CryptoService;
