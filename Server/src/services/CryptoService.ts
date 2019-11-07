
import bcrypt from 'bcrypt';

class CryptoService {

    private salt: string;

    constructor(salt: string) {
        this.salt = salt;
    }

    public hashPassword(password: string) {
        // Hash the password with bcrypt
        return bcrypt.hash(password, this.salt);
    }

}

export default CryptoService;
