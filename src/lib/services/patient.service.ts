import type { AxiosError } from "axios";
import type { CheckPatientCustomError, CheckPatientPayload, CheckPatientResponse } from "../types/patients/checkPatient";
import type { ListPatientsResponse } from "../types/patients/listPatients";
import type { RegisterPatientCustomError, RegisterPatientPayload, RegisterPatientResponse } from "../types/patients/registerPatient";
import { PatientApi } from "../apis/patient.api";
import type { PatientOverviewCustomError, PatientOverviewPayload, PatientOverviewResponse } from "../types/patients/patientOverview";

export const PatientService = {
    async checkPatient(payload: CheckPatientPayload): Promise<CheckPatientResponse> {
        try {
            return await PatientApi.checkPatient(payload);
        } catch (err) {
            const axiosError = err as AxiosError<CheckPatientCustomError>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                errors: axiosError.response?.data?.errors
            } as CheckPatientCustomError;
        }
    },

    async registerPatient(payload: RegisterPatientPayload): Promise<RegisterPatientResponse> {
        try {
            return await PatientApi.registerPatient(payload);
        } catch (err) {
            const axiosError = err as AxiosError<RegisterPatientCustomError>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                errors: axiosError.response?.data?.errors
            } as RegisterPatientCustomError;
        }
    },

    async listPatients(): Promise<ListPatientsResponse> {
        try {
            return await PatientApi.listPatients();
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro ao listar pacientes",
            };
        }
    },

    async getPatientOverview(payload: PatientOverviewPayload): Promise<PatientOverviewResponse> {
        try {
            return await PatientApi.getPatientOverview(payload);
        } catch (err) {
            const axiosError = err as AxiosError<PatientOverviewCustomError>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro ao buscar paciente",
            };
        }
    },
}