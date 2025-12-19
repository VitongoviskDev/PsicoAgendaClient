import type {
    BaseCustomError,
    BasePayload,
    BaseResponse,
    TErrorField,
    TPicture
} from "@/lib/types/api";

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    birthDate?: Date;
    cpf?: string;
    crp?: string;
    status: UserStatus;
    profiles?: {
        staff: StaffProfile | null,
        psychologist: PsychologistProfile | null,
        patient: PatientProfile | null
    }
}

type StaffProfileStatus = ""
export interface StaffProfile {
    active: boolean,
    role: StaffProfileStatus
}

export interface PsychologistProfile {
    active: boolean,
    crp: string,
    specialty: any
}

export interface PatientProfile { }

export const UserStatus = {
    PENDING_REGISTRATION: 'PENDING_REGISTRATION',
    ACTIVE: 'ACTIVE',
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];


//---------- RESPONSES --------------------------------------------------
export interface UpdateUserResponse extends BaseResponse<{
    user: User;
}> { }

export interface PatientByCpfResponse extends BaseResponse<{
    user: User;
}> { }

export interface CompleteOwnerProfileResponse extends BaseResponse<{
    user: User;
}> { }

//---------- PAYLOADS --------------------------------------------------
export interface UpdateUserPayload extends BasePayload {
    name?: string;
    email?: string;
    phone?: string;
    cpf?: string;
    crp?: string | null;
    profile_picture?: TPicture;
}
export interface PatientByCpfPayload extends BasePayload {
    cpf: string
}

export interface CompleteOwnerProfilePayload {
    cpf: string,
    birthDate: Date,
    phone: string,
    actAsPsychologist: boolean,
    crp?: string,
    profile_picture?: TPicture;
}

//---------- ERRORS --------------------------------------------------
export interface UpdateUserCustomError extends BaseCustomError<{
    errors: TErrorField<"cpf" | "birthDate" | "phone" | "crp">[]
}> { }

export interface PatientByCpfCustomError extends BaseCustomError<{
    errors: TErrorField<"cpf">[]
}> { }
export interface CompleteOwnerProfileCustomError extends BaseCustomError<{
    errors: TErrorField<"cpf" | "birthDate" | "phone" | "crp">[]
}> { }