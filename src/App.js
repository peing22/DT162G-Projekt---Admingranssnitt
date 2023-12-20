import React from "react";
import Login from "./components/login.component";
import Admin from "./components/admin.component";
import { AuthProvider, useAuth } from "./context/auth.context";

// Exporterar huvudkomponent för applikationen
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
    <main>
    {/* Renderar olika komponenter beroende på om användaren är inloggad eller inte */}
      {isLoggedIn ? (
        <Admin />
      ) : (
        <Login />
      )}
    </main>
  );
}