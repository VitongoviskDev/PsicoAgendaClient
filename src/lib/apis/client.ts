import axios from "axios";
import { toast } from "sonner";
import type { ServerCustomError } from "@/lib/types/api";

type LogoutCallback = () => void;

let logoutHandlers: LogoutCallback[] = []

export function setLogoutHandler(callback: LogoutCallback) {
    logoutHandlers?.push(callback);
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000 * 60 * 15, //15 SECONDS
});

api.interceptors.request.use((config) => {
    if (!!config.headers.Authorization) return config;

    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url;

        if (status === 500) {

            const customError: ServerCustomError = {
                status: status,
                message: error.message,
                error: error.error,
            }

            return Promise.reject(customError);
        }
        else if (status == 401) {

            const publicEndpoints = [
                "/auth/login",
                "/auth/register",
                "/auth/forgot-password"
            ];


            const isPublic = publicEndpoints.some((endpoint) =>
                url?.includes(endpoint)
            );

            if (!isPublic) {

                if (logoutHandlers.length <= 0) {
                    toast.error("Sua sessão expirou. Por favor, faça login novamente.");
                    console.error("Logout handler not specified");
                    return Promise.reject(new Error("Logout handler not specified"));
                }

                console.log(logoutHandlers);
                logoutHandlers.map(handler => handler());
            }
        }

        return Promise.reject(error);
    }
);
