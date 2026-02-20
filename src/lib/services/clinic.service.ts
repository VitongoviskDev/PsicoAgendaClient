import type { AxiosError } from "axios";
import { ClinicApi } from "../apis/clinic.api";
import type { RegisterClinicCustomError, RegisterClinicPayload, RegisterClinicResponse } from "../types/clinic/register-clinic";

export const ClinicService = {
    async registerClinic(payload: RegisterClinicPayload): Promise<RegisterClinicResponse> {
        try {
            return await ClinicApi.registerClinic(payload);
        } catch (err) {
            const axiosError = err as AxiosError<RegisterClinicCustomError>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                errors: axiosError.response?.data?.errors
            } as RegisterClinicCustomError;
        }
    },
}