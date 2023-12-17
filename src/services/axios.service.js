import axios from "axios";
import tokenService from "./token.service";

// Skapar en instans av Axios med specifika konfigureringsalternativ
const instance = axios.create({
    baseURL: "http://localhost:3050"
});

// Skapar interceptor för att lägga till accessToken i headerinformationen innan förfrågan 
instance.interceptors.request.use(
    (config) => {
        const token = tokenService.getLocalAccessToken();
        if (token) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Skapar interceptor för att hantera svar från backend och uppdatera accessToken vid behov
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/login" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const respons = await instance.post("/refreshtoken", {
                        refreshToken: tokenService.getLocalRefreshToken(),
                    });

                    const { accessToken } = respons.data;
                    tokenService.updateLocalAccessToken(accessToken);

                    return instance(originalConfig);

                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

// Exporterar instansen
export default instance;