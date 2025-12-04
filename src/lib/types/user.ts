import type {
    BaseCustomError,
    BaseResponse,
    TErrorField,
    TPicture
} from "@/lib/types/api";

export interface User {
    id: string;
    name: string;
    email: string;
    created_at: Date,
    profile_picture?: TPicture;
}

//---------- RESPONSES --------------------------------------------------
export interface UpdateUserResponse extends BaseResponse {
    user: User;
}

//---------- PAYLOADS --------------------------------------------------
export interface UpdateUserPayload {
    id: string;
    email?: string;
    profilePicture?: TPicture;
    name?: string;
}

//---------- ERRORS --------------------------------------------------
export interface UpdateUserCustomError extends BaseCustomError {
    errors: TErrorField<"name">[]
}