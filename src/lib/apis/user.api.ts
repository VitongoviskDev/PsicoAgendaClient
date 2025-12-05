import type {
    UpdateUserPayload,
    UpdateUserResponse
} from "@/lib/types/user";
import { api } from "./client";

export const UserApi = {
    async updateUser(payload: UpdateUserPayload): Promise<UpdateUserResponse> {
        // const { data } = await api.put<UpdateUserResponse>(`/user/${payload.id}`, payload);
        // return data;
        const form = new FormData();

        if (payload.name)
            form.append("name", payload.name);

        // Só adiciona se houver profile_picutre
        if (!!payload.profile_picture)
            form.append("profile_picture", payload.profile_picture);

        form.append("_method", "put");

        const { data } = await api.post<UpdateUserResponse>(`/users/${payload.routeParams["id"]}`, form);
        return data;
    }
};
