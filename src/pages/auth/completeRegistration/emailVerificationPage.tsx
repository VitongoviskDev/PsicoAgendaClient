"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLegend,
    FieldSet,
    FieldTitle
} from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"


import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"
import { useResendEmailVerifyCode } from "@/hooks/auth/useResendEmailVerificationCode"
import { useVerifyEmailVerificationCode } from "@/hooks/auth/useVerifyEmailVerificationCode"
import { useAuthContext } from "@/hooks/context/useAuthContext"
import type { ResendEmailVerificationCustomError } from "@/lib/types/auth/resendEmailVerification"
import { verifyEmailVerificationCodeSchema, type VerifyEmailVerificationCodeFormData, type VerifyEmailVerificationCustomError, type VerifyEmailVerificationPayload } from "@/lib/types/auth/verifyEmailVerificationCode"
import { hideEmail } from "@/lib/utils"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import EmailVerificationImage from '/images/auth/emailVerification.png'

const EmailVerificationPage = () => {

    const { user } = useAuthContext();

    const { mutateAsync: resendEmailVerificationCode, isPending: isResending } = useResendEmailVerifyCode();
    const { mutateAsync: verifyEmailVerificationCode, isPending: isVerifying } = useVerifyEmailVerificationCode();

    const {
        handleSubmit,
        watch,
        control
    } = useForm<VerifyEmailVerificationCodeFormData>({
        resolver: zodResolver(verifyEmailVerificationCodeSchema),
        defaultValues: {
            code: "",
        },
    })

    const handleResendEmailClick = async () => {
        try {
            const response = await resendEmailVerificationCode()
            toast.success(response.message)
        } catch (err) {
            const customEror = err as ResendEmailVerificationCustomError;
            toast.error(customEror.message)
        }
    }

    const handleVerifyCodeClick = async (formData: VerifyEmailVerificationCodeFormData) => {
        try {
            const payload: VerifyEmailVerificationPayload = {
                body: {
                    code: formData.code
                }
            }
            const response = await verifyEmailVerificationCode(payload)
            toast.success(response.message)
        } catch (err) {
            const customEror = err as VerifyEmailVerificationCustomError;
            toast.error(customEror.message)
        }
    }

    const watchedCode = watch("code");
    const lastSubmittedCode = useRef<string | null>(null);

    useEffect(() => {
        if (
            watchedCode.length === 7 &&
            watchedCode !== lastSubmittedCode.current &&
            !isVerifying
        ) {
            lastSubmittedCode.current = watchedCode;
            handleSubmit(handleVerifyCodeClick)();
        }
    }, [watchedCode, handleSubmit, isVerifying]);


    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2 min-h-96">
                    <form onSubmit={handleSubmit(handleVerifyCodeClick)}>
                        <FieldGroup className="p-6 h-full">
                            <FieldSet className="">
                                <FieldLegend>Verifique seu email</FieldLegend>
                                <FieldDescription className="max-w-92 text-center md:text-start">
                                    Enviamos um código de verificação para o endereço de email <strong className="text-primary">{hideEmail(user?.email ?? "")}</strong>.<br />
                                    Digite o código de 7 digitos no campo abaixo para ativar sua conta
                                </FieldDescription>
                            </FieldSet>
                            <FieldSet className="flex-1 items-center justify-center" >
                                <Field className="w-fit">
                                    <FieldTitle>Código</FieldTitle>
                                    <Controller
                                        name="code"
                                        control={control}
                                        render={({ field }) => (
                                            <InputOTP maxLength={7} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={field.onChange} value={field.value}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                </InputOTPGroup>

                                                <div className="h-px w-2 bg-black" />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                    <InputOTPSlot index={6} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        )} />
                                    <Button type="submit" className="w-full" disabled={isResending || isVerifying}>
                                        {
                                            isResending || isVerifying ? (
                                                <><Spinner /> Validando</>
                                            ) : (
                                                <>Validar Código</>
                                            )
                                        }
                                    </Button>
                                    <Button variant="link" type="button" className="w-full h-fit pt-0" disabled={isResending || isVerifying} onClick={handleResendEmailClick}>
                                        Reenviar código
                                    </Button>
                                </Field>
                            </FieldSet>
                            <FieldSet className="items-center">
                                <FieldDescription>
                                    Não se esqueça de verificar a caixa de span
                                </FieldDescription>
                            </FieldSet>
                        </FieldGroup>
                    </form>
                    <div className="bg-muted relative hidden md:block overflow-hidden h-full">
                        <img
                            src={EmailVerificationImage}
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default EmailVerificationPage
