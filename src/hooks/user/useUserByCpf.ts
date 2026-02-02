import { UserService } from "@/lib/services/user.service";
import type { UserByCpfPayload, UserByCpfResponse } from "@/lib/types/user";
import { useQuery } from "@tanstack/react-query";


export function useUserByCpf(payload: UserByCpfPayload) {
    return useQuery<UserByCpfResponse>({
        queryKey: ["user-by-cpf", payload.routeParams.cpf],
        queryFn: () => UserService.getUserByCpf(payload),
        enabled: payload?.routeParams?.cpf?.length === 11
    });
}