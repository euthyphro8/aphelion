
import bcrypt from 'bcrypt';
import Context from './AmbientContext';
import IAccountInfo from '@/interfaces/IAccountInfo';

class CryptoService {

    private saltRounds: number;

    constructor(saltRounds: number) {
        this.saltRounds = saltRounds;
    }

    public async verifyPassword(humanId: string, isEmail: boolean, password: string): Promise<boolean> {
        try {
            const account = await Context.DatabaseProvider.getAccount(humanId, isEmail);
            if (account) {
                return await bcrypt.compare(password, account.password);
            }
            return false;
        } catch (error) {
            Context.LoggerProvider.error(`There was a general error while verifying a password ${error.message}`);
            return false;
        }
    }

    public async hashPassword(password: string): Promise<string | null> {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            Context.LoggerProvider.error(`There was a general error while hashing a password ${error.message}`);
            return null;
        }
    }
}

export default CryptoService;
