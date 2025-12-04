// src/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/lib/services/auth.service";
import type { LoginPayload } from "@/lib/types/auth";

export function useLogin() {
    return useMutation({
        mutationFn: (payload: LoginPayload) => AuthService.login(payload),
    });
}