import DatabaseService from './DatabaseService';
import CryptoService from './CryptoService';
import MessageService from './MessageService';

class AmbientContext {
    public static DatabaseProvider: DatabaseService;
    public static MessageProvider: MessageService;
    public static CryptoProvider: CryptoService;
}

export default AmbientContext;
