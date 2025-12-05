import { AxiosError } from "axios";
import type {
    UpdateUserCustomError,
    UpdateUserPayload,
    UpdateUserResponse
} from "@/lib/types/user";
import { UserApi } from "@/lib/apis/user.api";

export const UserService = {
    async updateUser(payload: UpdateUserPayload): Promise<UpdateUserResponse> {
        try {
            return await UserApi.updateUser(payload);
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            const customError: UpdateUserCustomError = {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                error: axiosError.response?.data?.error
            }

            throw customError;
        }
    }
};