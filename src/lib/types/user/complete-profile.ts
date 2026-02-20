
import z from 'zod';
import type { BaseCustomError, BasePayload, BaseResponse, TErrorField } from '../api';
import type { User } from './user';

export const profileFormSchema = z.object({
    cpf: z.string().min(14, "CPF deve conter pelo menos 11 caracteres"),
    birthDate: z.date("Data de nascimento é obrigatória").min(1, "Data de nascimento é obrigatória"),
    phone: z.string().min(14, "Telefone deve conter pelo menos 11 caracteres"),
    isPsychologist: z.boolean(),
    crp: z.string().optional().nullable(),
}).superRefine((data, ctx) => {
    if (data.isPsychologist) {
        if (!data.crp || data.crp.length < 7) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "CRP deve conter pelo menos 7 caracteres",
                path: ["crp"],
            });
        }
    }
});

export type ProfileStepForData = z.infer<typeof profileFormSchema>;


export interface CompleteProfilePayload extends BasePayload<{
    body: {
        cpf: string,
        birthDate: Date,
        phone: string,
        isPsychologist: boolean,
        crp: string | null,
    }
}> { }

export interface CompleteProfileResponse extends BaseResponse<{
    user: User;
    access_token?: string;
    onboarding_token?: string;
}> { }


export interface CompleteProfileCustomError extends BaseCustomError<{
    fields: TErrorField<"cpf" | "birthDate" | "phone" | "crp">[];
}> { }