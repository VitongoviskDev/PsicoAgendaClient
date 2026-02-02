import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

import { Spinner } from "@/components/ui/spinner"
import { useAuthContext } from "@/hooks/context/useAuthContext"
import { loginSchema, type LoginForbidenError, type LoginFormData, type LoginPayload } from "@/lib/types/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import LoginImage from '/images/auth/login.png'

const LoginPage = () => {
  const { handleLogin } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting: isPending },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onLoginFormSubmit = async (formData: LoginFormData) => {
    try {
      const loginPayload: LoginPayload = {
        email: formData.email,
        password: formData.password
      }

      await handleLogin(loginPayload);

    } catch (err) {
      const customError = err as LoginForbidenError;
      console.log("ERROR: ", customError)

      toast.error(customError.message);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onLoginFormSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bem-Vindo de volta</h1>
                <p className="text-muted-foreground text-balance">
                  Acesse sua conta PsicoAgenda
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    to="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {
                    isPending ? (
                      <><Spinner />Entrando</>
                    ) : (
                      <>Entrar</>
                    )
                  }
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Ainda não tem uma conta <Link to={"/register"}>Registrar-se</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block overflow-hidden">
            <img
              src={LoginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage;