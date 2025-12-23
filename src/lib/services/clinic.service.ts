import type { AxiosError } from "axios";
import { ClinicApi } from "../apis/clinic.api";
import type { CompleteClinicCustomError, CompleteClinicPayload, CompleteClinicResponse } from "../types/clinic";

export const ClinicService = {
    async completeClinic(payload: CompleteClinicPayload): Promise<CompleteClinicResponse> {
        try {
            return await ClinicApi.completeClinic(payload);
        } catch (err) {
            const axiosError = err as AxiosError<CompleteClinicCustomError>;
            const customError: CompleteClinicCustomError = {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                error: axiosError.response?.data?.error
            }

            throw customError;
        }
    },
}