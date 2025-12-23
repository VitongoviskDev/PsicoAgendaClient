// src/api/auth.api.ts
import type { CompleteClinicPayload, CompleteClinicResponse } from "../types/clinic";
import { api } from "./client";

export const ClinicApi = {

    async completeClinic(payload: CompleteClinicPayload): Promise<CompleteClinicResponse> {
        const { data } = await api.post<CompleteClinicResponse>("/clinics/complete-clinic", payload);
        return data;
    },
};
