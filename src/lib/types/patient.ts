import type { User } from "./user/user";

export interface Patient {
    id: string;
    user: User;
    sessions: number;
    code: string;
    status: ProfileStatus;
}

export const PROFILE_STATUS_ENUM = {
    PENDING_VERIFICATION: 'PENDING_VERIFICATION',
    WAITING_FIRST_SECTION: 'WAITING_FIRST_SECTION',
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED',
    BLOCKED: 'BLOCKED',
} as const;

export type ProfileStatus = typeof PROFILE_STATUS_ENUM[keyof typeof PROFILE_STATUS_ENUM];