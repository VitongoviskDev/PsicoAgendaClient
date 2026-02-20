import { PatientService } from "@/lib/services/patient.service";
import { useQuery } from "@tanstack/react-query";

export function useListPatients() {
    return useQuery({
        queryKey: ["patients"],
        queryFn: () => PatientService.listPatients(),
    });
}
