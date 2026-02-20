import type { RegisterClinicPayload, RegisterClinicResponse } from "../types/clinic/register-clinic";
import { api } from "./client";

export const ClinicApi = {
    async registerClinic(payload: RegisterClinicPayload): Promise<RegisterClinicResponse> {
        const { data } = await api.post<RegisterClinicResponse>("/clinics", payload.body);
        return data;
    },
};
