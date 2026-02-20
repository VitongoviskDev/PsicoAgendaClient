import { SessionService } from "@/lib/services/session.service";
import { useQuery } from "@tanstack/react-query";

export function useListSessions() {
    return useQuery({
        queryKey: ["sessions"],
        queryFn: () => SessionService.listSessions(),
    });
}
