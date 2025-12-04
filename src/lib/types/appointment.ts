export interface Appointment {
    id: number;
    patientName: string;
    date: Date;
    status: AppointmentStatus;
}

export type AppointmentStatus = 
    'done' 
    | 'confirmed' 
    | 'cancelled' 
    | 'rescheduled' 
    | 'absence'
    | 'waiting'