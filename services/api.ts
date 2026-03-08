import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});


// 🔹 Request Interceptor (Attach Token)

api.interceptors.request.use(
    (config) => {

        if (typeof window !== "undefined") {

            const token = localStorage.getItem("token");

            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }

        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// 🔹 Response Interceptor (Handle 401)

api.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {

        if (error.response?.status === 401) {

            console.log("Unauthorized - logging out");

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);

    }

);