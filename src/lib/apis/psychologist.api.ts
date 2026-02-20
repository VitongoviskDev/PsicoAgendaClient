
import type { ListPsychologistProfilesResponse } from "../types/psychologist/listPsychologist";
import { api } from "./client";

export const PsychologistApi = {
    async listPsychologists(): Promise<ListPsychologistProfilesResponse> {
        const { data } = await api.get<ListPsychologistProfilesResponse>(`/psychologist-profiles`);
        return data;
    },
}
