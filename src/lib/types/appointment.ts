import type { SessionStatus } from "./session";

export interface Appointment {
    id: string;
    patientName: string;
    date: Date;
    status: SessionStatus;
}

export type AppointmentStatus =
    'done'
    | 'confirmed'
    | 'cancelled'
    | 'rescheduled'
    | 'absence'
    | 'waiting'