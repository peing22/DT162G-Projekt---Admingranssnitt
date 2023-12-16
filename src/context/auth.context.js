import React, { createContext, useContext, useState } from "react";

// Skapar autentiseringskontext med createContext
const AuthContext = createContext();

// Exporterar komponent för att hantera autentiseringsstatus
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const login = (user) => {
        
        // Lagrar användaruppgifter i localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Implementera logik för att sätta autentiseringsstatus baserat på accessToken/refreshToken
        setLoggedIn(true);
    };

    const logout = () => {

        // Implementera logik för att logga ut och uppdatera autentiseringsstatus
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Exporterar hook som kan användas i andra komponenter
export const useAuth = () => useContext(AuthContext);
