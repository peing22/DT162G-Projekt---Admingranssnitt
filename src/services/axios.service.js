import axios from "axios";
import tokenService from "./token.service";

const instance = axios.create({
    baseURL: "http://localhost:3050",
    headers: {
        "Content-Type": "application/json"
    }
});

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

export default instance;