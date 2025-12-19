import { AuthService } from "@/lib/services/auth.service";
import type {
    RegisterCustomError,
    RegisterOwnerPayload,
    RegisterOwnerResponse
} from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useRegisterOwner() {
    return useMutation<RegisterOwnerResponse, RegisterCustomError, RegisterOwnerPayload>({
        mutationFn: AuthService.registerOwner,
    });
}