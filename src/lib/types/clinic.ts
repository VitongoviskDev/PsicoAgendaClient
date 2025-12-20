import type { TPicture } from "./api";

export interface Clinic {
    id: string;
    name: string;
    description?: string;
    status: ClinicStatus;
    openedAt?: Date;
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
}[];

export interface CompleteClinicPayload {
    name: string,
    description?: string,
    openedAt?: Date,
    profilePicture?: TPicture,
    workingHours?: WorkingHours,
}