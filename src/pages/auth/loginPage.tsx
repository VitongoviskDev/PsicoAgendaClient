"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useAuthContext } from "@/hooks/context/useAuthContext"
import type { LoginCustomError, LoginPayload } from "@/lib/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { z } from "zod"

export const loginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(3, "A senha deve ter pelo menos 3 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {

    const { handleLogin: loginUser } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting: isPending },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const handleLogin = async (formData: LoginFormData) => {
        try {
            const loginPayload: LoginPayload = {
                email: formData.email,
                password: formData.password
            }

            await loginUser(loginPayload);

        } catch (err) {
            const customError = err as LoginCustomError;

            toast.error(customError.message);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    {...register("email")}
                                />
                                {errors.email && <FieldError>{errors.email.message}</FieldError>}
                            </Field>

                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link
                                        to="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register("password")}
                                />
                                {errors.password && <FieldError>{errors.password.message}</FieldError>}
                            </Field>

                            <Field className="flex flex-col gap-2">
                                <Button type="submit" disabled={isPending}>
                                    {
                                        isPending ? (
                                            <span className="flex items-center gap-2"><Spinner />Entrando</span>
                                        ) : (
                                            <span>Entrar</span>
                                        )
                                    }
                                </Button>

                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link to="/register" className="underline">
                                        Sign up
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}


export default LoginPage;