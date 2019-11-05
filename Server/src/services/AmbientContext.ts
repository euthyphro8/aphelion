import DatabaseService from './DatabaseService';
import CryptoService from './CryptoService';
import MessageService from './MessageService';
import LoggerService from './LoggerService';

class AmbientContext {
    public static DatabaseProvider: DatabaseService;
    public static MessageProvider: MessageService;
    public static CryptoProvider: CryptoService;
    public static LoggerProvider: LoggerService;
}

export default AmbientContext;
