import React, { createContext, useContext, useState, useEffect } from "react";
import axiosService from "../services/axios.service";
import tokenService from "../services/token.service";

// Skapar autentiseringskontext med createContext
const AuthContext = createContext();

// Exporterar komponent för att hantera autentiseringsstatus
export const AuthProvider = ({ children }) => {

    /* 
    Skapar en tillståndsvariabel som håller reda på om en användare är inloggad 
    eller inte. Tillståndsvariabeln initieras till false och en funktion skapas 
    för att uppdatera tillståndsvariabeln.
    */
    const [isLoggedIn, setLoggedIn] = useState(false);

    // Använder react-hook för att hämta användarinformation från localStorage
    useEffect(() => {
        const user = tokenService.getUser();

        // Sätter tillståndsvariabel till true om användarinformation finns lagrad
        if (user && user.accessToken) {
            setLoggedIn(true);
        }
    }, []);

    // Funktion som anropas när en användare försöker logga in
    const login = async (username, password) => {

        // Skickar en autentiseringsförfrågan till backend
        const response = await axiosService
            .post("/login", {
                username,
                password
            });

        // Sparar användarinformation och sätter tillståndsvariabeln till true
        if (response.data.accessToken) {
            tokenService.setUser(response.data);
            setLoggedIn(true);
        }
        return response.data;
    }

    // Funktion som anropas när en användare loggar ut
    const logout = async () => {

        try {
            // Hämtar användarinformation och lagrar ID i en variabel
            const user = tokenService.getUser();
            const userId = user.id;

            // Skickar en utloggningsförfrågan till backend
            await axiosService.post("/logout/" + userId);

            // Tar bort lagrad användarinformation och sätter tillståndsvariabeln till false
            tokenService.removeUser();
            setLoggedIn(false);

        } catch (error) {
            console.error("Meddelande:", error);
        }
    }

    // Returnerar kontextvärden till underordnade komponenter
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Exporterar hook som kan användas i andra komponenter
export const useAuth = () => useContext(AuthContext);
