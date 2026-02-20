import type { AxiosError } from "axios";
import { SessionApi } from "../apis/session.api";
import type { CreateSessionCustomError, CreateSessionPayload, CreateSessionResponse, ListSessionsResponse } from "../types/session";

export const SessionService = {
    async createSession(payload: CreateSessionPayload): Promise<CreateSessionResponse> {
        try {
            return await SessionApi.createSession(payload);
        } catch (err) {
            const axiosError = err as AxiosError<CreateSessionCustomError>;
            throw {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro ao criar sessão",
                errors: axiosError.response?.data?.errors
            } as CreateSessionCustomError;
        }
    },
    async listSessions(): Promise<ListSessionsResponse> {
        try {
            return await SessionApi.listSessions();
        } catch (err: any) {
            throw new Error(err.response?.data?.message || "Erro ao listar sessões");
        }
    },
}
