// src/hooks/useLogin.ts
import { UserService } from "@/lib/services/user.service";
import type { CompleteProfileCustomError, CompleteProfilePayload, CompleteProfileResponse } from "@/lib/types/user/complete-profile";
import { useMutation } from "@tanstack/react-query";

export function useCompleteProfile() {
    return useMutation<CompleteProfileResponse, CompleteProfileCustomError, CompleteProfilePayload>({
        mutationFn: UserService.completeProfile,
    });
}