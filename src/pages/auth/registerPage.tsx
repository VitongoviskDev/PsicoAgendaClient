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
import type { RegisterCustomError, RegisterOwnerPayload } from "@/lib/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { type FC } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import z from "zod"

export const registerSchema = z.object({
    name: z.string().min(3, "Nome deve conter pelo menos 3 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(3, "Senha deve conter pelo menos 3 caracteres"),
    confirm_password: z.string().min(3, "Confirmação de senha obrigatório"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: FC = () => {
    const { handleRegisterOwner: registerOwner } = useAuthContext();
    // const [psychologist, setPsychologist] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting: isPending },
        setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const handleRegister = async (formData: RegisterFormData) => {
        try {
            const registerPayload: RegisterOwnerPayload = {
                user: {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirm_password: formData.confirm_password,
                }
            }

            await registerOwner(registerPayload);

        } catch (err) {
            const customError = err as RegisterCustomError;
            const errors = customError.error?.errors
            if (errors) {
                errors.map(err => {
                    setError(err.field, { type: "manual", message: err.errors[0] })
                })
                return;
            }

            toast.error(customError.message);
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <FieldGroup className="gap-2">
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                {...register("name")}
                            />
                            {errors.name && <FieldError>{errors.name.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                            />
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not share it.
                            </FieldDescription>
                            {errors.email && <FieldError>{errors.email.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && <FieldError>{errors.password.message}</FieldError>}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                {...register("confirm_password")}
                            />
                            {errors.confirm_password && <FieldError>{errors.confirm_password.message}</FieldError>}
                        </Field>


                        <Field className="mt-6">
                            <Button type="submit" disabled={isPending}>
                                {
                                    isPending ?
                                        <><Spinner /> Cadastrando</> :
                                        <>Cadastrar</>
                                }
                            </Button>
                            <FieldDescription className="text-center">
                                Already have an account?{" "}
                                <Link to="/login" className="underline">
                                    Sign in
                                </Link>
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}

export default RegisterPage;