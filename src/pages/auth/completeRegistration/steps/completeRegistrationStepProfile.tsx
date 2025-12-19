import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { useAuthContext } from '@/hooks/context/useAuthContext';
import { useStepperContext } from '@/hooks/context/useStepperContext';
import type { CompleteOwnerProfilePayload, UpdateUserCustomError } from '@/lib/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';

export const profileSteFormSchema = z.object({
    cpf: z.string().min(14, "CPF deve conter pelo menos 11 caracteres"),
    birthDate: z.date("Data de nascimento é obrigatória").min(1, "Data de nascimento é obrigatória"),
    phone: z.string().min(14, "Telefone deve conter pelo menos 11 caracteres"),
    actAsPsychologist: z.boolean(),
    crp: z.string().min(8, "Telefone deve conter pelo menos 7 caracteres").optional(),
});

export type ProfileStepForData = z.infer<typeof profileSteFormSchema>;

const CompleteRegistrationStepProfile = () => {
    const { user, handleCompleteOwnerProfile } = useAuthContext();
    const { completeStep, nextStep } = useStepperContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting: isPending },
        watch,
        setValue,
        setError,
        control,
        reset,
    } = useForm<ProfileStepForData>({
        resolver: zodResolver(profileSteFormSchema),
    });

    const isCompleted = !!user?.cpf;
    useEffect(() => {
        if (!user) return;

        reset({
            cpf: formatCpf(user.cpf ?? ''),
            birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
            actAsPsychologist: !!user.profiles?.psychologist,
            crp: formatCrp(user.profiles?.psychologist?.crp ?? ''),
            phone: formatPhone(user.phone ?? ''),
        });
    }, [user, reset]);


    const wathcedValues = watch();

    const onProfileFormSubmit = async (formData: ProfileStepForData) => {
        try {
            const payload: CompleteOwnerProfilePayload = {
                cpf: formData.cpf,
                phone: formData.phone,
                birthDate: formData.birthDate,
                actAsPsychologist: formData.actAsPsychologist,
                crp: formData.crp,
            }
            const response = await handleCompleteOwnerProfile(payload);
            toast.success(response.message)

            completeStep();
            nextStep();
        } catch (err) {
            const customError = err as UpdateUserCustomError;
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

    const formatCpf = (value: string) => {
        return value
            .replace(/\D/g, '')
            .substring(0, 11)
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '').substring(0, 11);

        if (numbers.length <= 2) {
            return numbers;
        }

        if (numbers.length <= 6) {
            return numbers.replace(/(\d{2})(\d+)/, '($1) $2');
        }

        if (numbers.length <= 10) {
            return numbers.replace(
                /(\d{2})(\d{4})(\d+)/,
                '($1) $2-$3'
            );
        }

        return numbers.replace(
            /(\d{2})(\d{5})(\d{4})/,
            '($1) $2-$3'
        );
    };


    const formatCrp = (value: string) => {
        const numbers = value.replace(/\D/g, '').substring(0, 7);

        if (numbers.length <= 2) {
            return numbers;
        }

        return numbers.replace(
            /(\d{2})(\d+)/,
            '$1/$2'
        );
    };

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Complete o cadastro</CardTitle>
                <CardDescription>
                    Preencha os campos abaixo para prosseguir
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onProfileFormSubmit)}>
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-3">
                        <Field className="w-full">
                            <FieldLabel>CPF</FieldLabel>
                            <Input
                                id="cpf"
                                type="text"
                                {...register("cpf", {
                                    onChange: (e) => {
                                        const formatted = formatCpf(e.target.value);
                                        setValue("cpf", formatted, { shouldDirty: true });
                                    },
                                })}
                                placeholder="000.000.000-00"
                                maxLength={14}
                            />

                            <FieldError>{errors.cpf?.message}</FieldError>
                        </Field>
                        <Field className="w-full">
                            <FieldLabel>Nascimento</FieldLabel>
                            <Controller
                                name="birthDate"
                                control={control}
                                render={({ field }) => {
                                    const selectedDate = field.value
                                        ? new Date(field.value)
                                        : undefined;

                                    return (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date-picker"
                                                    className="w-32 justify-between font-normal"
                                                >
                                                    {selectedDate
                                                        ? selectedDate.toLocaleDateString()
                                                        : "Selecione uma data"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent
                                                className="w-auto overflow-hidden p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate}
                                                    captionLayout="dropdown"
                                                    onSelect={(date) => {
                                                        field.onChange(date ?? null);
                                                    }}
                                                    disabled={(day) => day > new Date()}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    );
                                }}
                            />

                            {errors.birthDate && <FieldError>{errors.birthDate?.message}</FieldError>}
                        </Field>
                        <Field className="w-full">
                            <FieldLabel>Telefone</FieldLabel>
                            <Input
                                id="phone"
                                type="text"
                                {...register("phone")}
                                onChange={(e) => {
                                    alert(e.target.value)
                                    const formatted = formatPhone(e.target.value);
                                    setValue("phone", formatted, { shouldDirty: true });
                                }}
                                placeholder="(00) 00000-0000"
                                maxLength={15}
                            />
                            {errors.phone && <FieldError>{errors.phone?.message}</FieldError>}
                        </Field>
                    </FieldGroup>
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-6 mt-4">
                        <Field className='w-full col-span-2'>
                            <FieldLabel>Psicologo</FieldLabel>
                            <FieldDescription>Ative essa opção apenas se for atuar como psicologo</FieldDescription>
                            <Controller
                                name="actAsPsychologist"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <div>
                                            <Switch onCheckedChange={(value) => field.onChange(!!value)} checked={field.value} />
                                        </div>
                                    )
                                }}
                            />
                        </Field>
                        {
                            wathcedValues.actAsPsychologist &&
                            <Field className="col-span-2">
                                <FieldLabel>CRP</FieldLabel>
                                <Input
                                    id="cpf"
                                    type="text"
                                    {...register("crp", {
                                        onChange: (e) => {
                                            const formatted = formatCrp(e.target.value);
                                            setValue("crp", formatted, { shouldDirty: true });
                                        },
                                    })}
                                    placeholder="00/00000"
                                    maxLength={8}
                                />

                                <FieldError>{errors.crp?.message}</FieldError>
                            </Field>
                        }
                    </FieldGroup>

                    <Button type="submit" disabled={isPending} className='mt-7 mb-4 w-full'>
                        {
                            isPending ?
                                <><Spinner /> {isCompleted ? "Atualizar" : "Cadastrando"}</> :
                                <>{isCompleted ? "Atualizar" : "Cadastrando"}</>
                        }
                    </Button>
                    <FieldDescription className="text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="underline">
                            Sign in
                        </Link>
                    </FieldDescription>
                </form>
            </CardContent>
        </Card>
    )
}

export default CompleteRegistrationStepProfile