
import bcrypt from 'bcrypt';
import AmbientContext from './AmbientContext';
import IUserInfo from '@/interfaces/IUserInfo';
import Logger from '@/utils/Logger';

class CryptoService {

    private salt: string;

    constructor() {
        this.salt = '96c551bd-2476-49bb-801b-15d53e629d1e';
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
            return AmbientContext.DatabaseProvider.addAccount(user)
                .catch((error: Error) => {
                    Logger.error(error.message);
                    return false;
                });
        });
    }

    public verifyPassword(humanId: string, isEmail: boolean, password: string): Promise<boolean> {
        // Hash the password with bcrypt
        return bcrypt.hash(password, this.salt).then((hash: string) => {
            return AmbientContext.DatabaseProvider.getAccount(humanId, isEmail).then((user: IUserInfo) => {
                return (user.password === hash);
            }).catch((error: Error) => {
                Logger.error(error.message);
                return false;
            });
        });
    }
}

export default CryptoService;
