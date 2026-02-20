import type { BaseCustomError, BasePayload, BaseResponse, TErrorField } from "../api";
import type { User } from "../user/user";

export interface CheckPatientPayload extends BasePayload<{
    params: { cpf: string }
}> { }

export interface CheckPatientResponse extends BaseResponse<{
    user?: User;
    isAlreadyPatientInClinic?: boolean;
}> { }

export interface CheckPatientCustomError extends BaseCustomError<{
    fields: TErrorField<"cpf">[]
}> { }
