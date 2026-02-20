import { UserApi } from "@/lib/apis/user.api";
import type {
    UpdateUserCustomError,
    UpdateUserPayload,
    UpdateUserResponse,
    UserByCpfCustomError,
    UserByCpfPayload,
    UserByCpfResponse
} from "@/lib/types/user/user";
import { AxiosError } from "axios";
import type { CompleteProfileCustomError, CompleteProfilePayload, CompleteProfileResponse } from "../types/user/complete-profile";

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
                errors: axiosError.response?.data?.error
            }

            throw customError;
        }
    },
    async completeProfile(payload: CompleteProfilePayload): Promise<CompleteProfileResponse> {
        try {
            return await UserApi.completeProfile(payload);
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            const customError: CompleteProfileCustomError = {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                errors: axiosError.response?.data?.errors
            }

            throw customError;
        }
    },
    async getUserByCpf(payload: UserByCpfPayload): Promise<UserByCpfResponse> {
        try {
            return await UserApi.getUserByCpf(payload);
        } catch (err) {
            const axiosError = err as AxiosError<any>;
            const customError: UserByCpfCustomError = {
                status: axiosError.response?.status || 500,
                message:
                    axiosError.response?.data?.message ||
                    axiosError.message ||
                    "Erro desconhecido",
                errors: axiosError.response?.data?.error
            }
            throw customError;
        }
    }
};