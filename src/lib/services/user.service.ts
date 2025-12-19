import { AxiosError } from "axios";
import type {
    CompleteOwnerProfileCustomError,
    CompleteOwnerProfilePayload,
    CompleteOwnerProfileResponse,
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
    },
    async completeOwnerProfile(payload: CompleteOwnerProfilePayload): Promise<CompleteOwnerProfileResponse> {
        try {
            return await UserApi.completeOwnerProfile(payload);
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            const customError: CompleteOwnerProfileCustomError = {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                error: axiosError.response?.data?.error
            }

            throw customError;
        }
    },
};