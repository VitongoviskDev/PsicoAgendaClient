import type { BaseCustomError, BaseResponse, TErrorField, TPicture } from "./api";

export interface Clinic {
    id: string;
    name: string;
    description?: string;
    status: ClinicStatus;
    openedAt: Date;
    picture?: string;
    workingHours: WorkingHours[];
}

export const ClinicStatus = {
    PENDING_SETUP: 'PENDING_SETUP',
    ACTIVE: 'ACTIVE',
} as const;

export type ClinicStatus = (typeof ClinicStatus)[keyof typeof ClinicStatus];


export interface WorkingHours {
    dayOfWeek: number;
    openAt: string;
    closeAt: string;
};

export interface CompleteClinicPayload {
    name: string;
    description?: string;
    openedAt: Date;
    workingHours: WorkingHours[];
    picture?: TPicture;
}
export interface SwitchClinicPayload { }

export interface CompleteClinicResponse extends BaseResponse<{
    clinic: Clinic;
}> { }

export interface CompleteClinicCustomError extends BaseCustomError<{
    errors: TErrorField<"name" | "description" | "status" | "openedAt">[];
}> { }