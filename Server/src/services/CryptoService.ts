
import bcrypt from 'bcrypt';

import IUserInfo from '@/interfaces/IUserInfo';
import Context from './AmbientContext';

class CryptoService {

    private salt: string;

    constructor(salt: string) {
        this.salt = salt;
    }

    public registerNewUser(username: string, email: string, password: string): Promise<boolean> {
        // Hash the password with bcrypt
        return bcrypt.hash(password, this.salt).then((hash: string) => {
            const user = {
                username: username,
                email: email,
                password: hash,
                score: 0
            } as IUserInfo;
            // Add the user to the database and return the results.
            return Context.DatabaseProvider.addAccount(user)
                .catch((error: Error) => {
                    Context.LoggerProvider.error(error.message);
                    return false;
                });
        });
    }

    public verifyPassword(humanId: string, isEmail: boolean, password: string): Promise<boolean> {
        // Hash the password with bcrypt
        return bcrypt.hash(password, this.salt).then((hash: string) => {
            return Context.DatabaseProvider.getAccount(humanId, isEmail).then((user: IUserInfo) => {
                return (user.password === hash);
            }).catch((error: Error) => {
                Context.LoggerProvider.error(error.message);
                return false;
            });
        });
    }
}

export default CryptoService;
