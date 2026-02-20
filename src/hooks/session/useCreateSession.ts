import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionService } from "@/lib/services/session.service";
import type { CreateSessionCustomError, CreateSessionPayload, CreateSessionResponse } from "@/lib/types/session";

export function useCreateSession() {
    const queryClient = useQueryClient();

    return useMutation<
        CreateSessionResponse,
        CreateSessionCustomError,
        CreateSessionPayload
    >({
        mutationFn: (payload: CreateSessionPayload) => SessionService.createSession(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sessions"] });
            // queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
}
