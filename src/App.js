import React from "react";
import Login from "./components/login.component";
import Admin from "./components/admin.component";
import { AuthProvider, useAuth } from "./context/auth.context";

export default function App() {
  return (
    <AuthProvider>
      <div className="app">
        <MainContent />
      </div>
    </AuthProvider>
  );
}

// Komponent som använder useAuth-hook för att hämta autentiseringsstatus
const MainContent = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        // Renderar Admin-komponent om användaren är inloggad
        <Admin />
      ) : (
        // Renderar Login-komponent om användaren inte är inloggad
        <Login />
      )}
    </>
  );
}