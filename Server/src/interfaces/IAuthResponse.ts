
interface IAuthResponse {
    isAuthenticated: boolean;
    username?: string;
    email?: string;
    passwordHash: string;
}

export default IAuthResponse;
