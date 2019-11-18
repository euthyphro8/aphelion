

enum DatabaseReturnStatus {
    UsernameTaken = 'The provided username is already in use.',
    EmailTaken = 'The provided email is already in use.',
    Success = 'The action succeeded.',
    Failure = 'The action failed.'
}
export default DatabaseReturnStatus;
