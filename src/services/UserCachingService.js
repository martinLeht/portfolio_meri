class UserCachingService {

    constructor() { }

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        const userInStorage = localStorage.getItem('user');

        if (userInStorage === null) return undefined;

        const user = JSON.parse(userInStorage);
        return user;
    }

    setAuthTokens(accessToken, refreshToken) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    }

    getAuthTokens() {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'));
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        if (!accessToken || !refreshToken) return undefined;
        
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }

    signOut() {
        window.sessionStorage.clear();
        localStorage.clear();
    }

    hasAuthTokens() {
        const authTokens = this.getAuthTokens();
        return authTokens !== undefined 
            && authTokens.accessToken !== undefined && authTokens.accessToken !== ''
            && authTokens.refreshToken !== undefined && authTokens.refreshToken !== '';
    }
}

export default UserCachingService;