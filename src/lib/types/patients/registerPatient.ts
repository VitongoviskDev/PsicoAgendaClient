import z from "zod";
import type { BaseCustomError, BasePayload, BaseResponse, TErrorField } from "../api";
import type { User } from "../user/user";

export const createPatientSchema = z.object({
    user_id: z.string().uuid().nullable().optional(),
    name: z.string().optional(),
    email: z.string().email("E-mail inválido").optional(),
    cpf: z.string().optional(),
    phone: z.string().optional(),
    birth_date: z.union([z.string(), z.date()]).optional(),
}).refine((data) => {
    // Se user_id for informado, o restante não é necessário
    if (data.user_id) return true;

    // Se cpf for informado, todo o resto (name e email) também deve ser informado
    if (data.cpf) {
        return !!(data.name && data.email);
    }

    // Se não houver user_id, ao menos cpf, name e email são esperados
    return false;
}, {
    message: "Quando o ID do usuário não é informado, CPF, Nome e Email são obrigatórios",
    path: ["cpf"]
});

export type CreatePatientFormData = z.infer<typeof createPatientSchema>;

export interface RegisterPatientPayload extends BasePayload<{
    body: CreatePatientFormData
}> { }

export interface RegisterPatientResponse extends BaseResponse<{
    user?: User;
    isAlreadyPatientInClinic?: boolean;
}> { }

export interface RegisterPatientCustomError extends BaseCustomError<{
    fields: TErrorField<"user_id" | "cpf" | "name" | "email">[]
}> { }
