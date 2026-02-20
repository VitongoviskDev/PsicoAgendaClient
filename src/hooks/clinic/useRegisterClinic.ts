// src/hooks/useLogin.ts
import { ClinicService } from "@/lib/services/clinic.service";
import type { RegisterClinicCustomError, RegisterClinicPayload, RegisterClinicResponse } from "@/lib/types/clinic/register-clinic";
import { useMutation } from "@tanstack/react-query";

export function useRegisterClinic() {
    return useMutation<RegisterClinicResponse, RegisterClinicCustomError, RegisterClinicPayload>({
        mutationFn: ClinicService.registerClinic,
    });
}