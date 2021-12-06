import history from '../../history';
import UserCachingService from '../UserCachingService';
const userCachingService = new UserCachingService();

export const jwtAuthTokenRefreshResponseInterceptor = async (error) => {
    console.log(error);
    if (error && error.response) {
        switch(error.response.status) {
            /**
             * Redirect to login page when attempting to access secure resource and following status codes are returned:
             * - Token missing or malformed error (400 bad request)
             * - Access and refresh token is expired error, use valid refreshtoken to refresh auth tokens (403 forbidden)
             */
            case 400:
            case 403:
                userCachingService.signOut();
                history.push("/login");
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
}