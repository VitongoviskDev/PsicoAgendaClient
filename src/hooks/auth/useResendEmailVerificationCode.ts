import { AuthService } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export function useResendEmailVerifyCode() {
    return useMutation({
        mutationFn: AuthService.resendEmailVerificationCode,
    });
}