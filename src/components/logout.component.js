import React from "react";
import { useAuth } from "../context/auth.context";

// Exporterar logout-komponent
export default function Logout() {

    // Använder useAuth-hook för att hämta logout-metoden från autentiseringskontexten
    const { logout } = useAuth();

    // Funktion som anropas vid klick på Logga ut-knappen
    const handleLogout = async () => {
        try {
            // Anropar metod för att logga ut
            await logout();

        } catch (error) {
            console.error("Felmeddelande:", error);
        }
    };

    // Renderar Logga ut-knapp
    return (
        <div className="logout">
            <button onClick={handleLogout}>Logga ut</button>
        </div>
    );
}
