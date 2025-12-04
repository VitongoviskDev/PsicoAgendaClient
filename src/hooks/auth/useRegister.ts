import { AuthService } from "@/lib/services/auth.service";
import type {
    RegisterResponse,
    RegisterCustomError,
    RegisterPayload
} from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
    return useMutation<RegisterResponse, RegisterCustomError, RegisterPayload>({
        mutationFn: AuthService.register,
    });
}