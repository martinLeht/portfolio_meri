class UserCachingService {

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        const userInStorage = localStorage.getItem('user');

        if (!userInStorage) return null;

        const user = JSON.parse(userInStorage);
        return user;
    }

    setAuthTokens(accessToken, refreshToken) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    }

    setAccessToken(accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
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
        sessionStorage.clear();
        localStorage.clear();
    }

    hasAuthTokens() {
        const authTokens = this.getAuthTokens();
        return authTokens !== undefined 
            && authTokens.accessToken !== undefined && authTokens.accessToken !== ''
            && authTokens.refreshToken !== undefined && authTokens.refreshToken !== '';
    }

    setTemporaryAccessGrant(tempAccessToken, tempUserId, tempUsername, tempUserEmail) {
        sessionStorage.setItem('tempAccessToken', JSON.stringify(tempAccessToken));
        sessionStorage.setItem('tempUserId', JSON.stringify(tempUserId));
        sessionStorage.setItem('tempUsername', JSON.stringify(tempUsername));
        sessionStorage.setItem('tempUserEmail', JSON.stringify(tempUserEmail));
    }

    getTemporaryAccessGrant() {
        const tempAccessTokenInStorage = JSON.parse(sessionStorage.getItem('tempAccessToken'));
        const tempUserIdInStorage = JSON.parse(sessionStorage.getItem('tempUserId'));
        const tempUsernameInStorage = JSON.parse(sessionStorage.getItem('tempUsername'));
        const tempUserEmailInStorage = JSON.parse(sessionStorage.getItem('tempUserEmail'));

        if (!tempAccessTokenInStorage || !tempUserIdInStorage || !tempUsernameInStorage) return null;

        return {
            tempAccessToken: tempAccessTokenInStorage,
            tempUserId: tempUserIdInStorage,
            tempUsername: tempUsernameInStorage,
            tempUserEmail: tempUserEmailInStorage
        }
    }

    hasTemporaryAccessGrant() {
        const tempAccessGrant = this.getTemporaryAccessGrant();
        return tempAccessGrant !== null 
            && !!tempAccessGrant.tempAccessToken
            && !!tempAccessGrant.tempUserId
            && !!tempAccessGrant.tempUsername;
    }
}

export default UserCachingService;