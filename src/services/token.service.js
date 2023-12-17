// Klass för att hantera användarinformation och autentiseringsrelaterade tokens
class TokenService {

    // Metod som tar emot ett användarobjekt och sparar det som JSON i localStorage
    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    // Metod för att hämta användarinformation från localStorage och returnera den som JS-objekt
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    // Metod för att ta bort användarinformationen från localStorage
    removeUser() {
        localStorage.removeItem("user");
    }

    // Metod för att hämta användarinformation från localStorage och returnerar accessToken om det finns
    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.accessToken;
    }

    // Metod för att hämta användarinformation från localStorage och returnerar refreshToken om det finns
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    /* 
    Metod för att hämta användarinformation från localStorage, uppdatera accessToken och spara det 
    uppdaterade användarobjektet som JSON i localStorage
    */
    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = token;
        localStorage.setItem("user", JSON.stringify(user));
    }
}
// Skapar en instans av klassen och exporterar instansen
const tokenService = new TokenService();
export default tokenService;
