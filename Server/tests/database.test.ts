
import DatabaseService from '../src/services/DatabaseService';
import IUserInfo from '../src/interfaces/IUserInfo';

// dbCtx.connect().then(() => {
//     logger.debug(`Connection callback. Attempting an insert.`);
//     return dbCtx.addAccount({
//         username: 'name',
//         email: 'user@email.com',
//         password: 'password',
//         score: 0
//     });
// }).then((result: DatabaseReturnStatus) => {
//     logger.debug(`Add callback. Insert status: ${result}.`);
// }).catch((error) => {
//     logger.crit('There was an error starting the service.');
// });

test('Database finds properly.', async () => {
    const dbCtx = new DatabaseService('mongodb://localhost:27017', 'aphelion', 'accounts');
    dbCtx.connect().then(() => {
        return dbCtx.getAccount('name', false);
    }).then((result: IUserInfo) => {
        expect(result.username).toBe('name');
    }).catch((error) => {
        console.error(error);
    });
});


