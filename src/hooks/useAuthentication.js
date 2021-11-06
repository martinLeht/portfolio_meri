import { useState } from "react";
import AuthenticationService from "../services/AuthenticationService";

export const useAuthentication = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const authenticationService = new AuthenticationService();

    const login = () => {
        return new Promise((res) => {
            authenticationService.loginUser().then(data => {
                if (data === undefined) return;
                setAuthenticated(true);
                res();
            }).catch(err => {
                setAuthenticated(false);
                console.log(err);
            });
        });
    }

    const logout = () => {
        return new Promise((res) => {
            setAuthenticated(false);
            res();
        });
    }

    return {
        authenticated,
        login,
        logout
    };
}