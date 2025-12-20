import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useStepperContext } from '@/hooks/context/useStepperContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import z from 'zod';

export const addressSteFormSchema = z.object({
    zipcode: z.string().min(9, "CEP deve conter pelo menos 8 caracteres"),
    address: z.string().min(1, "CEP deve conter pelo menos 8 caracteres"),
    complement: z.string().min(1, "CEP deve conter pelo menos 8 caracteres"),
    number: z.string().min(1, "CEP deve conter pelo menos 8 caracteres"),
    neighborhood: z.string().min(1, "CEP deve conter pelo menos 8 caracteres"),
    city: z.string().min(1, "CEP deve conter pelo menos 8 caracteres"),
    state: z.string().min(1, "CEP deve conter pelo menos 8 caracteres"),
});

export type AddressStepForData = z.infer<typeof addressSteFormSchema>;

const CompleteRegistrationStepAddress = () => {
    const { completeStep, nextStep } = useStepperContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting: isPending },
        watch,
        setValue,
    } = useForm<AddressStepForData>({
        resolver: zodResolver(addressSteFormSchema),
    });

    const onAddressFormSubmit = (formData: AddressStepForData) => {
        try {
            console.log(formData);
            completeStep();
            nextStep();
        } catch {

        }
    }

    const wathcedValues = watch();
    const formatZipcode = (value: string) => {
        return value
            .replace(/\D/g, '')
            .substring(0, 8)
            .replace(/(\d{5})(\d)/, '$1-$2');
    }

    useEffect(() => {
        const formatedZipcode = formatZipcode(`${wathcedValues.zipcode}`);
        setValue("zipcode", formatedZipcode, { shouldValidate: true })
    }, [wathcedValues.zipcode])

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Infome seu endereco <p className='text-sm font-normal text-zinc-500'>(Opicional)</p></CardTitle>
                <CardDescription>
                    Preencha os campos abaixo para prosseguir
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onAddressFormSubmit)}>
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-6 gap-2 mt-4">
                        <Field className='md:col-span-2'>
                            <FieldLabel htmlFor="zipcode">CEP</FieldLabel>
                            <Input
                                id="zipcode"
                                type="text"
                                {...register("zipcode")}
                                placeholder="00000-000"
                                maxLength={9}
                                pattern={REGEXP_ONLY_DIGITS}
                            />
                            {errors.zipcode && <FieldError>{errors.zipcode.message}</FieldError>}
                        </Field>
                        <Field className='md:col-span-4'>
                            <FieldLabel htmlFor="address">Endereço</FieldLabel>
                            <Input
                                id="address"
                                type="text"
                                {...register("address")}
                            />
                            {errors.address && <FieldError>{errors.address.message}</FieldError>}
                        </Field>

                        <Field className='md:col-span-3'>
                            <FieldLabel htmlFor="neighborhood">Bairro</FieldLabel>
                            <Input
                                id="neighborhood"
                                type="text"
                                {...register("neighborhood")}
                            />
                            {errors.neighborhood && <FieldError>{errors.neighborhood.message}</FieldError>}
                        </Field>
                        <Field className='md:col-span-2'>
                            <FieldLabel htmlFor="city">Cidade</FieldLabel>
                            <Input
                                id="city"
                                type="text"
                                {...register("city")}
                            />
                            {errors.city && <FieldError>{errors.city.message}</FieldError>}
                        </Field>
                        <Field className='md:col-span-1'>
                            <FieldLabel htmlFor="state">Estado</FieldLabel>
                            <Input
                                id="state"
                                type="text"
                                {...register("state")}
                            />
                            {errors.state && <FieldError>{errors.state.message}</FieldError>}
                        </Field>

                        <Field className='md:col-span-1'>
                            <FieldLabel htmlFor="number">Número</FieldLabel>
                            <Input
                                id="number"
                                type="text"
                                {...register("number")}
                            />
                            {errors.number && <FieldError>{errors.number.message}</FieldError>}
                        </Field>
                        <Field className='md:col-span-5'>
                            <FieldLabel htmlFor="complement">Complemento</FieldLabel>
                            <Input
                                id="complement"
                                type="text"
                                {...register("complement")}
                            />
                            {errors.complement && <FieldError>{errors.complement.message}</FieldError>}
                        </Field>

                    </FieldGroup>
                    <FieldGroup>
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

export default CompleteRegistrationStepAddress