import { PatientService } from "@/lib/services/patient.service";
import type { RegisterPatientCustomError, RegisterPatientPayload, RegisterPatientResponse } from "@/lib/types/patients/registerPatient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRegisterPatient() {
    const queryClient = useQueryClient();

    return useMutation<RegisterPatientResponse, RegisterPatientCustomError, RegisterPatientPayload>({
        mutationFn: (payload: RegisterPatientPayload) => PatientService.registerPatient(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["patients"] });
        }
    });
}
