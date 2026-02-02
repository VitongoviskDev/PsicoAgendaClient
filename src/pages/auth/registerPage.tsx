import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useAuthContext } from "@/hooks/context/useAuthContext"
import { registerSchema, type RegisterFormData, type RegisterUserCustomError, type RegisterUserPayload } from "@/lib/types/user/register-user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const RegisterPage = () => {
  const { handleRegister } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isPending },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onRegisterFormSubmit = async (formData: RegisterFormData) => {
    try {
      const registerPayload: RegisterUserPayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
      }

      await handleRegister(registerPayload);

    } catch (err) {
      const customError = err as RegisterUserCustomError;
      const errors = customError.error?.errors
      if (errors) {
        errors.map(err => {
          alert
          setError(err.field, { type: "manual", message: err.error })
        })
        return;
      }

      toast.error(customError.message);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onRegisterFormSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <FieldSet>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Create your account</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to create your account
                  </p>
                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors.email && <FieldError>{errors.email.message}</FieldError>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="name">Nome Completo</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nome Completo"
                    {...register("name")}
                  />
                  {errors.name && <FieldError>{errors.name.message}</FieldError>}
                </Field>
                <Field>
                  <Field className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="password">Senha</FieldLabel>
                      <Input id="password" type="password" placeholder="Senha" {...register("password")} />
                      {errors.password && <FieldError>{errors.password.message}</FieldError>}
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirm-password">
                        Confirmaçã de Senha
                      </FieldLabel>
                      <Input id="confirm-password" type="password" placeholder="Confirme a Senha" {...register("confirm_password")} />
                      {errors.confirm_password && <FieldError>{errors.confirm_password.message}</FieldError>}
                    </Field>
                  </Field>
                </Field>
                <Field >
                  <Button type="submit" disabled={isPending}>
                    {
                      isPending ?
                        <><Spinner /> Enviado dados</> :
                        <>Criar conta</>
                    }
                  </Button>
                </Field>
                <FieldDescription className="text-center">
                  Já tem uma conta? <Link to={"/login"}>Entrar</Link>
                </FieldDescription>
              </FieldSet>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Clicando em continuar, você concorda com os nossos <Link to={"#"}>Termos de Serviço</Link> e <Link to={"#"}>Política de Privacidade</Link>F
      </FieldDescription>
    </div>
  )
}

export default RegisterPage;