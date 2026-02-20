import { PsychologistService } from "@/lib/services/psychologist.service";
import { useQuery } from "@tanstack/react-query";

export function useListPsychologists() {
    return useQuery({
        queryKey: ["psychologists"],
        queryFn: () => PsychologistService.listPsychologists(),
    });
}
