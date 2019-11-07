
import DatabaseService from '../src/services/DatabaseService';

test('Database inserts properly.', async () => {
    const dbCtx = new DatabaseService('mongodb://localhost:27017', 'aphelion', 'accounts');
    const result = await dbCtx.addAccount({
        username: 'test',
        email: 'username@email.com',
        password: 'password',
        score: 0
    });
    expect(result).toBeTruthy();
});