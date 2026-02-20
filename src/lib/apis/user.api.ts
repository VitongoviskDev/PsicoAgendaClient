import type {
    UpdateUserPayload,
    UpdateUserResponse,
    UserByCpfPayload,
    UserByCpfResponse
} from "@/lib/types/user/user";
import { api } from "./client";
import type { CompleteProfilePayload, CompleteProfileResponse } from "../types/user/complete-profile";

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
    },
    async completeProfile(payload: CompleteProfilePayload): Promise<CompleteProfileResponse> {

        // const form = new FormData();
        // const body = payload.body;

        // form.append('cpf', body.cpf);
        // form.append('birthDate', body.birthDate.toISOString());
        // form.append('phone', body.phone);

        // form.append('actAsPsychologist', String(body.isPsychologist));
        // if (body.isPsychologist && body.crp) {
        //     form.append('crp', body.crp);
        // }

        // if (payload.profile_picture) {
        //     form.append('profile_picture', payload.profile_picture);
        // }

        // form.append("_method", "put");

        const { data } = await api.post<CompleteProfileResponse>(`/users/complete-profile`, payload.body);
        return data;
    },

    async getUserByCpf(payload: UserByCpfPayload): Promise<UserByCpfResponse> {
        const { data } = await api.get<UserByCpfResponse>(`/users/cpf/${payload.routeParams.cpf}`);
        return data;
    },
}
