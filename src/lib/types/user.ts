import type {
    BaseCustomError,
    BasePayload,
    BaseResponse,
    RouteParams,
    TErrorField,
    TPicture
} from "@/lib/types/api";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    cpf?: string;
    crp?: string;
    profile_picture?: string;
}



//---------- RESPONSES --------------------------------------------------
export interface UpdateUserResponse extends BaseResponse<{
    user: User;
}> { }

//---------- PAYLOADS --------------------------------------------------
export interface UpdateUserPayload extends BasePayload {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    cpf?: string;
    crp?: string;
    profile_picture?: TPicture;
}

//---------- ERRORS --------------------------------------------------
export interface UpdateUserCustomError extends BaseCustomError<{
    errors: TErrorField<"name">[]
}> { }