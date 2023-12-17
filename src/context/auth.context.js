import React, { createContext, useContext, useState } from "react";
import axiosService from "../services/axios.service";
import tokenService from "../services/token.service";

// Skapar autentiseringskontext med createContext
const AuthContext = createContext();

// Exporterar komponent för att hantera autentiseringsstatus
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const login = async (username, password) => {

        const response = await axiosService
            .post("/login", {
                username,
                password
            });
        if (response.data.accessToken) {
            tokenService.setUser(response.data);
            setLoggedIn(true);
        }
        return response.data;
    }

    const logout = () => {

        // Implementera logik för att logga ut och uppdatera autentiseringsstatus
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Exporterar hook som kan användas i andra komponenter
export const useAuth = () => useContext(AuthContext);
