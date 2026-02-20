import z from "zod";
import type { BaseCustomError, BaseResponse } from "./api";
import type { Patient } from "./patient";
import type { Psychologist } from "./psychologist";
import type { StaffProfile } from "./user/user";

//----------[ ENUMS ]------------------------------ 

export const SessionStatus = {
    WAITING_CONFIRMATION: 'WAITING_CONFIRMATION',
    CONFIRMED: 'CONFIRMED',
    CANCELED: 'CANCELED',
    COMPLETED: 'COMPLETED',
    RESCHEDULED: 'RESCHEDULED',
} as const;

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus];

//----------[ ENTITIES ]------------------------------ 
export interface Session {
    id: string;
    patient?: Patient;
    psychologist?: Psychologist;
    creator: StaffProfile;
    status: SessionStatus;
    date: Date;
    duration: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

//----------[ SCHEMAS ]------------------------------ 
export const createSessionSchema = z.object({
    patientId: z.string().uuid("Selecione um paciente"),
    duration: z.number().min(1, "Duração mínima de 1 minuto"),
    price: z.number().min(0, "Preço não pode ser negativo"),
    psychologistId: z.string().uuid("Selecione um psicólogo"),
    date: z.date({ message: "Selecione uma data" }),
})

export type CreateSessionFormData = z.infer<typeof createSessionSchema>

//----------[ PAYLOADS ]------------------------------ 
export interface CreateSessionPayload {
    patientId: string;
    psychologistId: string;
    date: string;
    duration: number; // minutes
    price: number; // cents
    status?: SessionStatus;
}

//----------[ RESPONSES ]------------------------------ 

export interface CreateSessionResponse extends BaseResponse<{
    session: Session;
}> { }

export interface ListSessionsResponse extends BaseResponse<{
    sessions: Session[];
}> { }

//----------[ ERRORS ]------------------------------ 
export interface CreateSessionCustomError extends BaseCustomError<{
    fields: { field: string; errors: string[] }[];
}> { }
