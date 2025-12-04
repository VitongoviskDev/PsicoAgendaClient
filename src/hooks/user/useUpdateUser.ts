import { queryClient } from "@/lib/apis/queryClient";
import { UserService } from "@/lib/services/user.service";
import type { UpdateUserCustomError, UpdateUserPayload, UpdateUserResponse } from "@/lib/types/user";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUser() {
    return useMutation<UpdateUserResponse, UpdateUserCustomError, UpdateUserPayload>({
        mutationFn: UserService.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invitations"] })
        }
    });
}