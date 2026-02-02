import z from "zod";
import type { BaseCustomError, BaseResponse, TErrorField } from "./api";
import type { Clinic } from "./clinic";
import type { User } from "./user";


export const loginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(3, "A senha deve ter pelo menos 3 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;


//---------- PAYLOADS --------------------------------------------------
// LOGIN
export interface LoginPayload {
    email: string;
    password: string;
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


export interface ChangePasswordResponse extends BaseResponse<{}> { }

//---------- ERRORS --------------------------------------------------

export interface LoginForbidenError extends BaseCustomError<{
    status: string;
    user: User;
    verification_token: string;
}> { }

export interface LogoutCustomErrror extends BaseCustomError<{}> { }

export interface CompleteRegistrationCustomError extends BaseCustomError<{
    errors: TErrorField<"name" | "image">[];
}> { }

export interface ForgotPasswordCustomError extends BaseCustomError<{}> { }

export interface MeCustomError extends BaseCustomError<{}> { }


export interface ChangePasswordCustomError extends BaseCustomError<{
    errors: TErrorField<"password" | "new_password" | "new_password_confirmation">[];
}> { }