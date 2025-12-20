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
    RegisterOwnerPayload,
    RegisterOwnerResponse,
    ResendVerificationEmailPayload,
    ResendVerificationEmailResponse
} from "@/lib/types/auth";
import { api } from "./client";

export const AuthAPI = {

    async registerOwner(payload: RegisterOwnerPayload): Promise<RegisterOwnerResponse> {
        const { data } = await api.post<RegisterOwnerResponse>("/auth/register-owner", payload);
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

    async resendVerificationEmail(payload: ResendVerificationEmailPayload): Promise<ResendVerificationEmailResponse> {
        const response = await api.post<ResendVerificationEmailResponse>(
            "/auth/resend-confirm-email",
            payload
        );
        return response.data;
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
};
