import type { BaseCustomError, BasePayload, BaseResponse } from "../api";

export interface ResendEmailVerificationPayload extends BasePayload<{}> { }

export interface ResendEmailVerificationResponse extends BaseResponse<{}> { }

export interface ResendEmailVerificationCustomError extends BaseCustomError<{}> { }