import { AxiosError } from "axios";
import { AuthAPI } from "@/lib/apis/auth.api";
import type {
    LoginPayload,
    RegisterPayload,
    ForgotPasswordPayload,
    ResendVerificationEmailPayload,
    LoginResponse,
    RegisterResponse,
    ForgotPasswordReseponse,
    MeResponse,
    LoginCustomError,
    RegisterCustomError,
    MeCustomError,
    LogoutCustomErrror,
    ForgotPasswordCustomError,
    ResendVerificationEmailResponse,
    ResendVerificationEmailCustomError,
    LogoutResposne,
    MePayload,
    ChangePasswordPayload,
    ChangePasswordResponse,
    ChangePasswordCustomError,
} from "@/lib/types/auth";

export const AuthService = {
    async me(payload: MePayload): Promise<LoginResponse> {
        try {

            const formatedPayload = {
                ...payload,
                token: payload.token.replaceAll('"', "").trim()
            }

            return await AuthAPI.me(formatedPayload);
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
            } as MeCustomError;
        }
    },

    async login(payload: LoginPayload): Promise<LoginResponse> {
        try {
            return await AuthAPI.login(payload);
        } catch (err) {
            const axiosError = err as AxiosError<LoginCustomError>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                user: axiosError.response?.data?.user || null
            } as LoginCustomError;
        }
    },

    async logout(): Promise<LogoutResposne> {
        try {
            return await AuthAPI.logout();
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
            } as LogoutCustomErrror;
        }
    },

    async register(payload: RegisterPayload): Promise<RegisterResponse> {
        try {
            return await AuthAPI.register(payload);
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                errors: axiosError.response?.data?.errors || [],
            } as RegisterCustomError;
        }
    },

    async forgotPassword(payload: ForgotPasswordPayload): Promise<ForgotPasswordReseponse> {
        try {
            return await AuthAPI.forgotPassword(payload);
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
            } as ForgotPasswordCustomError;
        }
    },

    async getCurrentUser(): Promise<MeResponse> {
        try {
            return await AuthAPI.getCurrentUser();
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
            } as MeCustomError;
        }
    },

    async resendVerificationEmail(payload: ResendVerificationEmailPayload): Promise<ResendVerificationEmailResponse> {
        try {
            return await AuthAPI.resendVerificationEmail(payload);
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
            } as ResendVerificationEmailCustomError;
        }
    },
    async changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
        try {
            return await AuthAPI.changePassword(payload);
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            console.log(axiosError.response);
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                errors: axiosError.response?.data?.errors || []
            } as ChangePasswordCustomError;
        }
    },
};