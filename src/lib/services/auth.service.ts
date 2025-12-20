import { AuthAPI } from "@/lib/apis/auth.api";
import type {
    ChangePasswordCustomError,
    ChangePasswordPayload,
    ChangePasswordResponse,
    ForgotPasswordCustomError,
    ForgotPasswordPayload,
    ForgotPasswordReseponse,
    LoginCustomError,
    LoginPayload,
    LoginResponse,
    LogoutCustomErrror,
    LogoutResposne,
    MeCustomError,
    MePayload,
    MeResponse,
    RegisterCustomError,
    RegisterOwnerPayload,
    RegisterOwnerResponse,
    ResendVerificationEmailCustomError,
    ResendVerificationEmailPayload,
    ResendVerificationEmailResponse
} from "@/lib/types/auth";
import { AxiosError } from "axios";

export const AuthService = {
    async registerOwner(payload: RegisterOwnerPayload): Promise<RegisterOwnerResponse> {
        try {
            return await AuthAPI.registerOwner(payload);
        } catch (err) {
            const axiosError = err as AxiosError<RegisterCustomError>;
            const customError: RegisterCustomError = {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                error: axiosError.response?.data?.error
            }

            throw customError;
        }
    },

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
            const customError: LoginCustomError = {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                error: axiosError.response?.data?.error
            }

            throw customError;
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