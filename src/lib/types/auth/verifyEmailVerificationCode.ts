import z from "zod";
import type { BaseCustomError, BasePayload, BaseResponse } from "../api";

import type { User } from "../user/user";

export const verifyEmailVerificationCodeSchema = z.object({
    code: z.string().min(7, "Nome deve conter pelo menos 3 caracteres")
});

export type VerifyEmailVerificationCodeFormData = z.infer<typeof verifyEmailVerificationCodeSchema>;

export interface VerifyEmailVerificationPayload extends BasePayload<{
    body: {
        code: string;
    }
}> { }

export interface VerifyEmailVerificationResponse extends BaseResponse<{
    user: User;
    access_token?: string;
    onboarding_token?: string;
}> { }

export interface VerifyEmailVerificationCustomError extends BaseCustomError<{}> { }