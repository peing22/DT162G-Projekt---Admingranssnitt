import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth.context";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            // Skicka förfrågan till din backend för att få användaruppgifter
            const response = await axios.post("http://localhost:3050/login",
                {
                    username,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            // Anropar metod och skickar med respons
            login(response.data);

        } catch (error) {
            console.error("Error-meddelande:", error);
            // Hantera fel här, t.ex. visa ett felmeddelande för användaren
        }
    };

    return (
        <div className="login">
            <h2>Logga in</h2>
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
            </form>
        </div>
    );
}