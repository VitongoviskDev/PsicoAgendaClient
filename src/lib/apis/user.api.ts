import type {
    CompleteOwnerProfilePayload,
    CompleteOwnerProfileResponse,
    UpdateUserPayload,
    UpdateUserResponse,
    UserByCpfPayload,
    UserByCpfResponse
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
    },
    async completeOwnerProfile(payload: CompleteOwnerProfilePayload): Promise<CompleteOwnerProfileResponse> {
        // const { data } = await api.put<UpdateUserResponse>(`/user/${payload.id}`, payload);
        // return data;
        const form = new FormData();

        // form.append('clinic_id', payload.clinic_id);
        form.append('cpf', payload.cpf);
        form.append('birthDate', payload.birthDate.toISOString());
        form.append('phone', payload.phone);

        form.append('actAsPsychologist', String(payload.actAsPsychologist));
        if (payload.actAsPsychologist && payload.crp) {
            form.append('crp', payload.crp);
        }

        if (payload.profile_picture) {
            form.append('profile_picture', payload.profile_picture);
        }

        // form.append("_method", "put");

        const { data } = await api.post<CompleteOwnerProfileResponse>(`/users/complete-profile/owner`, form);
        return data;
    },
    async getUserByCpf(payload: UserByCpfPayload): Promise<UserByCpfResponse> {
        const { data } = await api.get<UserByCpfResponse>(`/users/cpf/${payload.routeParams.cpf}`);
        return data;
    },
}
