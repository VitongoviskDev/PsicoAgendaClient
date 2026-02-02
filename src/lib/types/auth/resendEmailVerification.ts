import type { BaseCustomError, BasePayload, BaseResponse } from "../api";

export interface ResendEmailVerificationPayload extends BasePayload<{
    body: {},
    params: {}
}> { }

export interface ResendEmailVerificationResponse extends BaseResponse<{}> { }

export interface ResendEmailVerificationCustomError extends BaseCustomError<{}> { }