import z from "zod";
import type { BaseCustomError, BaseResponse, TErrorField } from "../api";
import type { User } from "../user";

export const registerSchema = z.object({
    name: z.string().min(3, "Nome deve conter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(3, "Senha deve conter pelo menos 3 caracteres"),
    confirm_password: z.string().min(3, "Confirmação de senha obrigatório"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;


export interface RegisterUserPayload {
    name: string,
    email: string,
    password: string,
    confirm_password: string,
}

export interface RegisterUserResponse extends BaseResponse<{
    user: User;
    access_token: string;
}> { }


export interface RegisterUserCustomError extends BaseCustomError<{
    errors: TErrorField<"name" | "email" | "password" | "confirm_password">[];
}> { }