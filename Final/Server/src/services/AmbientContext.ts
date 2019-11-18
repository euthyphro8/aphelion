import ConnectionService from './ConnectionService';
import DatabaseService from './DatabaseService';
import CryptoService from './CryptoService';
import MessageService from './MessageService';
import LoggerService from './LoggerService';
import GameService from './GameService';

class AmbientContext {
    public static ConnectionProvider: ConnectionService;
    public static DatabaseProvider: DatabaseService;
    public static MessageProvider: MessageService;
    public static CryptoProvider: CryptoService;
    public static LoggerProvider: LoggerService;
    public static GameProvider: GameService;
}

export default AmbientContext;
