export interface Clinic {
    id: string;
    name: string;
    description?: string;
    status: ClinicStatus;
    openedAt: Date;
    picture?: string;
    crp?: string;
    workingHours: WorkingHours[];
}

export const ClinicStatus = {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
} as const;

export type ClinicStatus = (typeof ClinicStatus)[keyof typeof ClinicStatus];


export interface WorkingHours {
    dayOfWeek: number;
    openAt: string;
    closeAt: string;
};

export interface SwitchClinicPayload { }
