import type { User } from "./user";

export interface Patient {
    user: User;
    sessions: number;
    first_session?: Date;
    next_session?: Date;
    status: string
}