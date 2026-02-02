import { AuthService } from "@/lib/services/auth.service";
import type { RegisterUserCustomError, RegisterUserPayload, RegisterUserResponse } from "@/lib/types/user/register-user";
import { useMutation } from "@tanstack/react-query";

export function useRegisterUser() {
    return useMutation<RegisterUserResponse, RegisterUserCustomError, RegisterUserPayload>({
        mutationFn: AuthService.registerOwner,
    });
}