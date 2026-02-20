import type { BaseCustomError, BaseResponse } from "../api";
import type { Patient } from "../patient";

export interface PatientOverviewPayload {
    params: {
        id: string;
    };
}
export interface PatientOverviewResponse extends BaseResponse<{
    patient: Patient;
    first_session: Date | null;
    next_session: Date | null;
    last_session: Date | null;
    sessions: {
        completed: number;
        canceled: number;
        missed: number;
        total: number;
    };
}> { }

export interface PatientOverviewCustomError extends BaseCustomError<{}> { }
