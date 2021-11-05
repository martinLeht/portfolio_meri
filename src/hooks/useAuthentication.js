import { useState } from "react";

export const useAuthentication = () => {
    const [authenticated, setAuthenticated] = useState(false);

    const login = () => {
        return new Promise((res) => {
            setAuthenticated(true);
            res();
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