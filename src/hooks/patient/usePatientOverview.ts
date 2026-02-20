import { PatientService } from "@/lib/services/patient.service";
import type { PatientOverviewPayload } from "@/lib/types/patients/patientOverview";
import { useQuery } from "@tanstack/react-query";

export function usePatientOverview(payload: PatientOverviewPayload) {
    return useQuery({
        queryKey: ["patient", payload.params.id],
        queryFn: () => PatientService.getPatientOverview(payload),
    });
}
