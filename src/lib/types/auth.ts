import type { BaseCustomError, BaseResponse, TErrorField } from "./api";
import type { Clinic } from "./clinic";
import type { User } from "./user";

//---------- PAYLOADS --------------------------------------------------
// LOGIN
export interface LoginPayload {
    email: string;
    password: string;
}

//REGISTER
export interface RegisterOwnerPayload {
    user: {
        name: string,
        email: string,
        password: string,
        confirm_password: string,
    },
    clinic?: {
        name: string,
        address?: string,
        phone?: string,
        status?: string,
    },
    psychologist?: {
        crp: string;
    }
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    invite_token: string | null;
}

export interface CompleteRegistrationPayload {
    clinic_id: string;
    clinic_name: string;
    image: File | null;
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
export interface RegisterOwnerResponse extends BaseResponse<{
    user: User;
    currentClinic: Clinic;
    clinics: Clinic[];
    access_token: string;
}> { }

export interface LoginResponse extends BaseResponse<{
    user: User;
    currentClinic: Clinic;
    clinics: Clinic[];
    access_token: string;
}> { }

export interface CompleteRegistrationResponse extends BaseResponse<{
    user: User;
    clinic: Clinic;
    clinics: Clinic[];
    access_token: string;
    token_type: string;
}> { }

export interface LogoutResposne extends BaseResponse<{}> { }

export interface ForgotPasswordReseponse extends BaseResponse<{}> { }

export interface MeResponse extends BaseResponse<{
    user: User;
    access_token: string;
    // enterprise: Enterprise;
}> { }

export interface ResendVerificationEmailResponse extends BaseResponse<{}> { }

export interface ChangePasswordResponse extends BaseResponse<{}> { }

//---------- ERRORS --------------------------------------------------

export interface LoginCustomError extends BaseCustomError<{
    user?: User;
}> { }

export interface LogoutCustomErrror extends BaseCustomError<{}> { }

export interface RegisterCustomError extends BaseCustomError<{
    errors: TErrorField<"name" | "email" | "password" | "confirm_password">[];
}> { }
export interface CompleteRegistrationCustomError extends BaseCustomError<{
    errors: TErrorField<"name" | "image">[];
}> { }

export interface ForgotPasswordCustomError extends BaseCustomError<{}> { }

export interface MeCustomError extends BaseCustomError<{}> { }

export interface ResendVerificationEmailCustomError extends BaseCustomError<{}> { }

export interface ChangePasswordCustomError extends BaseCustomError<{
    errors: TErrorField<"password" | "new_password" | "new_password_confirmation">[];
}> { }