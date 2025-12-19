// src/hooks/useLogin.ts
import { UserService } from "@/lib/services/user.service";
import type { CompleteOwnerProfileCustomError, CompleteOwnerProfilePayload, CompleteOwnerProfileResponse } from "@/lib/types/user";
import { useMutation } from "@tanstack/react-query";

export function useCompleteOwnerProfile() {
    return useMutation<CompleteOwnerProfileResponse, CompleteOwnerProfileCustomError, CompleteOwnerProfilePayload>({
        mutationFn: UserService.completeOwnerProfile,
    });
}