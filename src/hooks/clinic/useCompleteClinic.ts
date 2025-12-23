// src/hooks/useLogin.ts
import { ClinicService } from "@/lib/services/clinic.service";
import type { CompleteClinicCustomError, CompleteClinicPayload, CompleteClinicResponse } from "@/lib/types/clinic";
import { useMutation } from "@tanstack/react-query";

export function useCompleteClinic() {
    return useMutation<CompleteClinicResponse, CompleteClinicCustomError, CompleteClinicPayload>({
        mutationFn: ClinicService.completeClinic,
    });
}