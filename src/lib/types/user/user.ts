import type {
    BaseCustomError,
    BaseResponse,
    TErrorField,
    TPicture
} from "@/lib/types/api";
import type { ProfileStatus } from "../psychologist";

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
export const StaffProfileRole = {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE',
} as const;

export type StaffProfileRole = (typeof StaffProfileRole)[keyof typeof StaffProfileRole];
export interface StaffProfile {
    status: ProfileStatus,
    role: StaffProfileRole
}

export interface PsychologistProfile {
    id: string,
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
    EMAIL_VERIFIED: 'EMAIL_VERIFIED',
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

//---------- ERRORS --------------------------------------------------
export interface UpdateUserCustomError extends BaseCustomError<{
    fields: TErrorField<"cpf" | "birthDate" | "phone" | "crp">[]
}> { }

export interface UserByCpfCustomError extends BaseCustomError<{
    fields: TErrorField<"cpf">[]
}> { }