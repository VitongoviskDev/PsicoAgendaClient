import type { User } from "./user/user";

export interface Psychologist {
    id: string;
    user: User;
    status: ProfileStatus;
    crp: string;
}

export const PROFILE_STATUS_ENUM = {
    PENDING_VERIFICATION: 'PENDING_VERIFICATION',
    WAITING_FIRST_SECTION: 'WAITING_FIRST_SECTION',
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED',
    BLOCKED: 'BLOCKED',
} as const;

export type ProfileStatus = typeof PROFILE_STATUS_ENUM[keyof typeof PROFILE_STATUS_ENUM];