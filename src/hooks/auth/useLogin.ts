// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/lib/services/auth.service";
import type { LoginCustomError, LoginPayload, LoginResponse } from "@/lib/types/auth";

export function useLogin() {
    return useMutation<LoginResponse, LoginCustomError, LoginPayload>({
        mutationFn: AuthService.login,
    });
}