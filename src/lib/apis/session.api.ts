import { api } from "./client";
import type { CreateSessionPayload, CreateSessionResponse, ListSessionsResponse } from "../types/session";

export const SessionApi = {
    async createSession(payload: CreateSessionPayload): Promise<CreateSessionResponse> {
        const response = await api.post<CreateSessionResponse>("/sessions", payload);
        return response.data;
    },
    async listSessions(): Promise<ListSessionsResponse> {
        const response = await api.get<ListSessionsResponse>("/sessions");
        return response.data;
    }
}
