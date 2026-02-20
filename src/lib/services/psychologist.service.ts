import { PsychologistApi } from "../apis/psychologist.api";
import type { ListPsychologistProfilesResponse } from "../types/psychologist/listPsychologist";

export const PsychologistService = {
    async listPsychologists(): Promise<ListPsychologistProfilesResponse> {
        try {
            return await PsychologistApi.listPsychologists();
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Erro ao listar psicólogos");
        }
    },
}
