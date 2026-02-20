import { PatientService } from "@/lib/services/patient.service";
import type { CheckPatientPayload, CheckPatientResponse } from "@/lib/types/patients/checkPatient";
import { useQuery } from "@tanstack/react-query";


export function useCheckPatient(payload: CheckPatientPayload) {
    return useQuery<CheckPatientResponse>({
        queryKey: ["patient-check", payload.params.cpf],
        queryFn: () => PatientService.checkPatient(payload),
        enabled: payload?.params?.cpf?.length === 11
    });
}