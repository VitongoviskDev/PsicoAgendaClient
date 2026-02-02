// src/api/auth.api.ts
import type {
    ChangePasswordPayload,
    ChangePasswordResponse,
    CompleteRegistrationPayload,
    CompleteRegistrationResponse,
    ForgotPasswordPayload,
    ForgotPasswordReseponse,
    LoginPayload,
    LoginResponse,
    LogoutResposne,
    MePayload,
    MeResponse,
} from "@/lib/types/auth";
import { api } from "./client";
import type { ResendEmailVerificationResponse } from "../types/auth/resendEmailVerification";
import type { RegisterUserPayload, RegisterUserResponse } from "../types/user/register-user";
import type { VerifyEmailVerificationPayload, VerifyEmailVerificationResponse } from "../types/auth/verifyEmailVerificationCode";

export const AuthAPI = {

    async registerOwner(payload: RegisterUserPayload): Promise<RegisterUserResponse> {
        const { data } = await api.post<RegisterUserResponse>("/auth/register", payload);
        return data;
    },

    async login(payload: LoginPayload): Promise<LoginResponse> {
        const { data } = await api.post<LoginResponse>("/auth/login", payload);
        return data;
    },

    async logout(): Promise<LogoutResposne> {
        const { data } = await api.post<LogoutResposne>("/auth/logout", {});
        return data;
    },

    async getCurrentUser(): Promise<MeResponse> {
        const { data } = await api.get<MeResponse>("/auth/me");
        return data;
    },

    async me(payload: MePayload): Promise<LoginResponse> {
        const { data } = await api.get<LoginResponse>("/auth/me", {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            }
        });
        return data;
    },

    async forgotPassword(payload: ForgotPasswordPayload): Promise<ForgotPasswordReseponse> {
        const { data } = await api.post<ForgotPasswordReseponse>("/auth/forgot-password", payload);
        return data;
    },

    async changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
        const response = await api.put<ChangePasswordResponse>(
            "/auth/change-password",
            payload
        );
        return response.data;
    },

    async completeRegistration(payload: CompleteRegistrationPayload): Promise<CompleteRegistrationResponse> {
        const { data } = await api.post<CompleteRegistrationResponse>(
            "/auth/complete-registration",
            payload,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );
        return data;
    },

    async resendEmailVerificationCode(): Promise<ResendEmailVerificationResponse> {
        const response = await api.post<ResendEmailVerificationResponse>(
            "/auth/resend-email-verification-code",
        );
        return response.data;
    },
    async verifyEmailVerificationCode(payload: VerifyEmailVerificationPayload): Promise<VerifyEmailVerificationResponse> {
        const response = await api.post<VerifyEmailVerificationResponse>(
            "/auth/verify-email-verification-code",
            payload.body
        );
        return response.data;
    },
};
