

//---------- PAYLOADS --------------------------------------------------
import type { User } from "./user";
import type { BaseCustomError, BaseResponse, TErrorField } from "./api";

// LOGIN
export interface LoginPayload {
    email: string;
    password: string;
}

//REGISTER
export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    invite_token: string | null;
}

//FORGOT PASSWORD
export interface ForgotPasswordPayload {
    email: string;
}

export interface ResendVerificationEmailPayload {
    email: string;
}

export interface MePayload {
    token: string;
}

export interface ChangePasswordPayload {
    password: string;
    new_password: string;
    new_password_confirmation: string;
}
//---------- RESPONSES --------------------------------------------------

export interface LoginResponse extends BaseResponse {
    token_type: string;
    access_token: string;
    user: User;
    // settings: Preferences;
}

export interface LogoutResposne extends BaseResponse { }

export interface RegisterResponse extends BaseResponse {
    user: User;
    access_token: string;
}

export interface ForgotPasswordReseponse extends BaseResponse { }

export interface MeResponse extends BaseResponse {
    user: User;
    access_token: string;
    // enterprise: Enterprise;
}

export interface ResendVerificationEmailResponse extends BaseResponse { }

export interface ChangePasswordResponse extends BaseResponse { }

//---------- ERRORS --------------------------------------------------

export interface LoginCustomError extends BaseCustomError {
    user?: User;
}

export interface LogoutCustomErrror extends BaseCustomError { }

export interface RegisterCustomError extends BaseCustomError {
    errors: TErrorField<"name" | "email" | "password" | "confirmPassword">[];
}

export interface ForgotPasswordCustomError extends BaseCustomError { }

export interface MeCustomError extends BaseCustomError { }

export interface ResendVerificationEmailCustomError extends BaseCustomError { }

export interface ChangePasswordCustomError extends BaseCustomError {
    errors: TErrorField<"password" | "new_password" | "new_password_confirmation">[];
}