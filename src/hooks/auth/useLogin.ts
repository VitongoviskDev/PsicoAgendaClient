// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/lib/services/auth.service";
import type { LoginForbidenError, LoginPayload, LoginResponse } from "@/lib/types/auth";

export function useLogin() {
    return useMutation<LoginResponse, LoginForbidenError, LoginPayload>({
        mutationFn: AuthService.login,
    });
}