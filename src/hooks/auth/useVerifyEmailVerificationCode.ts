import { AuthService } from "@/lib/services/auth.service";
import type { VerifyEmailVerificationCustomError, VerifyEmailVerificationPayload, VerifyEmailVerificationResponse } from "@/lib/types/auth/verifyEmailVerificationCode";
import { useMutation } from "@tanstack/react-query";

export function useVerifyEmailVerificationCode() {
    return useMutation<VerifyEmailVerificationResponse, VerifyEmailVerificationCustomError, VerifyEmailVerificationPayload>({
        mutationFn: AuthService.verifyEmailVerificationCode,
    });
}