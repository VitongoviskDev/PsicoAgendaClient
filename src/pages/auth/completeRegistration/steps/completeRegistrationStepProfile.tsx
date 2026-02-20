import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldSet, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { useAuthContext } from '@/hooks/context/useAuthContext';
import { useStepperContext } from '@/hooks/context/useStepperContext';
import { profileFormSchema, type CompleteProfileCustomError, type CompleteProfilePayload, type ProfileStepForData } from '@/lib/types/user/complete-profile';
import { TypeFormatter } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDownIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CompleteRegistrationStepProfile = () => {
    const { user, handleCompleteProfile } = useAuthContext();
    const { completeStep, nextStep } = useStepperContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting: isPending },
        watch,
        setValue,
        setError,
        clearErrors,
        control,
        reset,
    } = useForm<ProfileStepForData>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            isPsychologist: true,
        }
    });

    const isCompleted = !!user?.cpf;
    useEffect(() => {
        if (!user) return;

        reset({
            cpf: TypeFormatter.toCpf(user.cpf ?? ''),
            birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
            isPsychologist: !!user.profiles?.psychologist,
            crp: TypeFormatter.toCrp(user.profiles?.psychologist?.crp ?? ''),
            phone: TypeFormatter.toPhone(user.phone ?? ''),
        });
    }, [user, reset]);


    const wathcedValues = watch();

    const onProfileFormSubmit = async (formData: ProfileStepForData) => {
        try {
            const payload: CompleteProfilePayload = {
                body: {
                    cpf: formData.cpf,
                    phone: formData.phone,
                    birthDate: formData.birthDate,
                    isPsychologist: formData.isPsychologist,
                    crp: formData.crp ?? null,
                }
            }
            const response = await handleCompleteProfile(payload);
            toast.success(response.message)

            completeStep();
            nextStep();
        } catch (err) {
            const customError = err as CompleteProfileCustomError;
            const fields = customError.errors.fields

            console.log("FIELDS: ", fields)
            fields.map(err => {
                setError(err.field, { type: "manual", message: err.error })
            })

            toast.error(customError.message);
        }
    }

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Complete o cadastro</CardTitle>
                <CardDescription>
                    Preencha os campos abaixo para prosseguir
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(onProfileFormSubmit)}>
                <CardContent>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-3">
                        <Field className="w-full">
                            <FieldTitle>CPF</FieldTitle>
                            <Input
                                id="cpf"
                                type="text"
                                {...register("cpf", {
                                    onChange: (e) => {
                                        const formatted = TypeFormatter.toCpf(e.target.value);
                                        setValue("cpf", formatted, { shouldDirty: true });
                                    },
                                })}
                                placeholder="000.000.000-00"
                                maxLength={14}
                            />
                            <FieldError>{errors.cpf?.message}</FieldError>
                        </Field>
                        <Field className="w-full">
                            <FieldTitle>Nascimento</FieldTitle>
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
                            <FieldTitle>Telefone</FieldTitle>
                            <Input
                                id="phone"
                                type="text"
                                {...register("phone")}
                                onChange={(e) => {
                                    const formatted = TypeFormatter.toPhone(e.target.value);
                                    setValue("phone", formatted, { shouldDirty: true });
                                }}
                                placeholder="(00) 00000-0000"
                                maxLength={15}
                            />
                            {errors.phone && <FieldError>{errors.phone?.message}</FieldError>}
                        </Field>
                    </FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-6 mt-4">
                        <Field className='w-full col-span-2'>
                            <FieldTitle>Você é Psicólogo?</FieldTitle>
                            <div className='flex items-center gap-3 mt-2'>
                                <Controller
                                    name="isPsychologist"
                                    control={control}
                                    defaultValue={true}
                                    render={({ field }) => {
                                        return (
                                            <Switch
                                                onCheckedChange={(value) => {
                                                    field.onChange(!!value);
                                                    if (!value) {
                                                        setValue("crp", null);
                                                        clearErrors("crp");
                                                    }
                                                }}
                                                checked={field.value}
                                            />
                                        )
                                    }}
                                />
                                <FieldDescription className='text-xs'>Ative para informar seu CRP se atuar como psicólogo.</FieldDescription>
                            </div>
                        </Field>
                        {
                            wathcedValues.isPsychologist ? (

                                <Field className="col-span-2">
                                    <FieldTitle>CRP</FieldTitle>
                                    <Input
                                        id="crp"
                                        type="text"
                                        {...register("crp", {
                                            onChange: (e) => {
                                                const formatted = TypeFormatter.toCrp(e.target.value);
                                                setValue("crp", formatted, { shouldDirty: true });
                                            },
                                        })}
                                        placeholder="00/00000"
                                        maxLength={8}
                                    />

                                    <FieldError>{errors.crp?.message}</FieldError>
                                </Field>
                            ) : (
                                <></>
                            )
                        }
                    </FieldSet>
                </CardContent>
                <CardFooter>
                    <FieldSet className='w-full'>
                        <Button type="submit" disabled={isPending} className='mt-7 mb-4 w-full'>
                            {
                                isPending ?
                                    <><Spinner /> {isCompleted ? "Concluir cadastro" : "Cadastrando"}</> :
                                    <>{isCompleted ? "Concluir cadastro" : "Cadastrando"}</>
                            }
                        </Button>
                    </FieldSet>

                </CardFooter>
            </form>
        </Card>
    )
}

export default CompleteRegistrationStepProfile