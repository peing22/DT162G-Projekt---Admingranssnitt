import React, { useState } from "react";
import { useAuth } from "../context/auth.context";

// Exporterar login-komponent
export default function Login() {

    // Skapar tillståndsvariabler satta till tom textsträng och funktioner för att uppdatera deras värden
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Använder useAuth-hook för att hämta login-metoden från autentiseringskontexten
    const { login } = useAuth();

    // Funktion som anropas vid klick på Logga in-knappen
    const handleLogin = async () => {
        try {
            // Återställer tidigare felmeddelanden
            setError("");

            // Anropar metod för att logga in och skickar med värden
            await login(username, password);

        } catch (error) {
            console.error("Felmeddelande:", error);

            // Visar felmeddelande för användaren om inloggning misslyckas
            setError(error.response?.data.message || "Ett fel uppstod vid inloggning!");
        }
    };

    // Renderar användargränssnitt med formulär och visning av eventuella felmeddelanden
    return (
        <div className="login">
            <h1>Logga in</h1>
            <form>
                <label>
                    Användarnamn:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Lösenord:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Logga in
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
