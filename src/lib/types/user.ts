import type {
    BaseCustomError,
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
    status: UserStatus;
    lastClinicId?: string | null;
    profile_picture?: string;
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

export interface PatientProfile {
    sessions: number;
    first_session?: Date;
    next_session?: Date;
    status: string
}

export const UserStatus = {
    PENDING_EMAIL_VERIFICATION: 'PENDING_EMAIL_VERIFICATION',
    PENDING_REGISTRATION: 'PENDING_REGISTRATION',
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED',
    BLOCKED: 'BLOCKED',
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];


//---------- RESPONSES --------------------------------------------------
export interface UpdateUserResponse extends BaseResponse<{
    user: User;
}> { }

export interface UserByCpfResponse extends BaseResponse<{
    user: User;
}> { }

export interface CompleteOwnerProfileResponse extends BaseResponse<{
    user: User;
}> { }

//---------- ROUTE PARAMS --------------------------------------------------
export type UpdateUserRouteParams = {
    id: string;
}
export type UserByCpfRouteParams = {
    cpf: string;
}
//---------- PARAMS --------------------------------------------------

//---------- PAYLOADS --------------------------------------------------
export type UpdateUserPayload = {
    routeParams: UpdateUserRouteParams;
    name?: string;
    email?: string;
    phone?: string;
    cpf?: string;
    crp?: string | null;
    profile_picture?: TPicture;
}

export type UserByCpfPayload = {
    routeParams: UserByCpfRouteParams
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

export interface UserByCpfCustomError extends BaseCustomError<{
    errors: TErrorField<"cpf">[]
}> { }
export interface CompleteOwnerProfileCustomError extends BaseCustomError<{
    errors: TErrorField<"cpf" | "birthDate" | "phone" | "crp">[]
}> { }