import z from "zod";
import type { BaseCustomError, BasePayload, BaseResponse, TErrorField, TPicture } from "../api";
import type { Clinic } from "../clinic";

export const registerCliniSchema = z.object({
    name: z.string().min(3, 'Nome da clínica é obrigatório'),
    description: z.string().optional(),
    openedAt: z.date(),
    profilePicture: z.instanceof(File).optional(),
    crp: z.string().optional().nullable(),
});

export type RegisterClinicFormData = z.infer<typeof registerCliniSchema>;

export interface RegisterClinicPayload extends BasePayload<{
    body: {
        name: string;
        description?: string;
        openedAt: Date;
        picture?: TPicture;
        crp?: string | null;
    }
}> { }
import type { User } from "../user/user";

export interface RegisterClinicResponse extends BaseResponse<{
    user: User;
    onboarding_token: string;
    clinic: Clinic;
}> { }

export interface RegisterClinicCustomError extends BaseCustomError<{
    errors: TErrorField<"name" | "description" | "openedAt" | "profilePicture" | "crp">[];
}> { }