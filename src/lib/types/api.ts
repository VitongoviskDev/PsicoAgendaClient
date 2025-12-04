export interface BaseResponse {
    message: string;
}
export type RouteParamsType = string | number;
export interface BasePayload {
    routeParams: Record<string, RouteParamsType>
}
export interface BaseCustomError {
    status: number;
    message: string;
}

export type TPagination<TData> = {
    current_page: number;
    data: TData[];
    next_page_url?: string,
    path: string,
    per_page: number,
    prev_page_url?: string,
    to: number,
    total: number,
    last_page: number
}

export interface PaginateParams {
    per_page?: number
    page?: number
}
export const defaultPaginateParams: PaginateParams = {
    page: 1,
    per_page: 25,
}

export interface ServerCustomError extends BaseCustomError {
    error: string;
}


export type TErrorField<TData> = {
    field: TData;
    errors: string[]
}
export type TPicture = File | string | null;