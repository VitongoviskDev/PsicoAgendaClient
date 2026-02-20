import type { CheckPatientPayload, CheckPatientResponse } from "../types/patients/checkPatient";
import type { ListPatientsResponse } from "../types/patients/listPatients";
import type { PatientOverviewPayload, PatientOverviewResponse } from "../types/patients/patientOverview";
import type { RegisterPatientPayload, RegisterPatientResponse } from "../types/patients/registerPatient";
import { api } from "./client";

export const PatientApi = {
    async checkPatient(payload: CheckPatientPayload): Promise<CheckPatientResponse> {
        const { data } = await api.get<CheckPatientResponse>(`/patient-profiles/check/${payload.params.cpf}`);
        return data;
    },

    async registerPatient(payload: RegisterPatientPayload): Promise<RegisterPatientResponse> {
        const { data } = await api.post<RegisterPatientResponse>(`/patient-profiles`, payload.body);
        return data;
    },

    async listPatients(): Promise<ListPatientsResponse> {
        const { data } = await api.get<ListPatientsResponse>(`/patient-profiles`);
        return data;
    },

    async getPatientOverview(payload: PatientOverviewPayload): Promise<PatientOverviewResponse> {
        const { data } = await api.get<PatientOverviewResponse>(`/patient-profiles/${payload.params.id}/overview`);
        return data;
    },
}
