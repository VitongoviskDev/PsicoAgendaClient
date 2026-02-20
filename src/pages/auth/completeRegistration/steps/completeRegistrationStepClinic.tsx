import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldSet, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { useClinicContext } from '@/hooks/context/useClinicContext';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAuthContext } from '@/hooks/context/useAuthContext';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useStepperContext } from '@/hooks/context/useStepperContext';
import { registerCliniSchema, type RegisterClinicFormData, type RegisterClinicPayload } from '@/lib/types/clinic/register-clinic';
import { getInitials, TypeFormatter } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuPencil, LuTrash2 } from 'react-icons/lu';


const CompleteRegistrationStepClinic = () => {
    const { syncAuthState } = useAuthContext();
    const { currentClinic, handleRegisterClinic: handleCompleteClinic } = useClinicContext();
    const { completeStep, nextStep } = useStepperContext();

    const [previewImage, setPreviewImage] = useState<string>(currentClinic?.picture ?? '');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const {
        handleSubmit,
        control,
        register,
        setValue,
        reset,
        watch,
        formState: { errors, isSubmitting: isPending },
    } = useForm<RegisterClinicFormData>({
        resolver: zodResolver(registerCliniSchema),
        defaultValues: {
            name: currentClinic?.name ?? '',
            description: currentClinic?.description ?? '',
            openedAt: currentClinic?.openedAt ?? undefined,
            crp: currentClinic?.crp ?? '',
        },
    });

    const isCompleted = !!currentClinic?.name;

    useEffect(() => {
        if (!currentClinic) return;

        reset({
            name: currentClinic.name ?? '',
            description: currentClinic.description ?? '',
            openedAt: currentClinic.openedAt
                ? new Date(currentClinic.openedAt)
                : undefined,
            crp: currentClinic.crp ?? '',
        });
    }, [currentClinic, reset]);

    const watchedValues = watch();

    const onSubmit = async (formData: RegisterClinicFormData) => {
        try {

            const payload: RegisterClinicPayload = {
                body: {
                    name: formData.name,
                    description: formData.description,
                    openedAt: formData.openedAt,
                    picture: formData.profilePicture,
                    crp: formData.crp ?? null,
                }
            };

            const response = await handleCompleteClinic(payload);

            if (response.data.user) {
                syncAuthState(response.data.user, response.data.onboarding_token);
            }

            toast.success(response.message);
            completeStep();
            nextStep();
        } catch (err: any) {
            toast.error(err.message ?? 'Erro ao salvar clínica');
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Dados da clínica</CardTitle>
                <CardDescription>
                    Informe os dados básicos da sua clínica
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldSet className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='col-span-1 row-span-2 flex flex-col items-center justify-center gap-4 py-2'>
                            <div
                                className='relative size-24 flex items-center justify-center group aspect-square overflow-hidden rounded-full cursor-pointer border'
                                onClick={() => fileInputRef?.current?.click()}
                            >
                                <div
                                    className='
                                    absolute inset-0 z-10
                                    flex items-center justify-center
                                    bg-zinc-900/50 opacity-0
                                    group-hover:opacity-100
                                    transition-all duration-300'>
                                    <LuPencil
                                        className='text-white text-2xl'
                                    />
                                </div>
                                <Avatar className="size-full object-cover cursor-pointer">
                                    <AvatarImage src={previewImage ?? undefined} />
                                    {
                                        !!watchedValues.name ? (
                                            <AvatarFallback className="text-2xl">{getInitials(watchedValues.name)}</AvatarFallback>
                                        ) : (
                                            <AvatarFallback className='text-3xl'>#</AvatarFallback>
                                        )
                                    }
                                </Avatar>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={!previewImage}
                                onClick={() => {
                                    setValue('profilePicture', undefined, { shouldDirty: true });
                                    setPreviewImage("");
                                }}
                                className="w-full max-w-[160px]"
                            >
                                <LuTrash2 /> Remover Imagem
                            </Button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setValue('profilePicture', file, { shouldDirty: true });
                                    setPreviewImage(URL.createObjectURL(file));
                                }}
                            />
                        </div>

                        <Field className="md:col-span-2">
                            <FieldTitle>Nome da clínica<span className="text-xs text-red-500">*</span></FieldTitle>
                            <Input {...register('name')} placeholder="Digite o nome da clínica" />
                            <FieldError>{errors.name?.message}</FieldError>
                        </Field>

                        <Field className="md:col-span-2">
                            <FieldTitle>Data de abertura</FieldTitle>

                            <Controller
                                name="openedAt"
                                control={control}
                                render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-between font-normal"
                                            >
                                                {field.value
                                                    ? new Date(field.value).toLocaleDateString()
                                                    : 'Selecionar data'}
                                                <LuChevronDown />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                captionLayout="dropdown"
                                                onSelect={field.onChange}
                                                disabled={(day) => day > new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                            <FieldError>{errors.openedAt?.message}</FieldError>
                        </Field>
                        <Field className="md:col-span-2">
                            <FieldTitle>CRP<span className="text-xs text-muted-foreground">(Opcional)</span></FieldTitle>
                            <Input
                                {...register('crp', {
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

                        {/* DESCRIÇÃO */}
                        <Field className="col-span-full">
                            <FieldTitle>Descrição</FieldTitle>
                            <Textarea
                                className="h-24 resize-none"
                                placeholder="Uma breve descrição sobre sua clínica..."
                                {...register('description')}
                            />
                        </Field>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="col-span-full mt-4"
                        >
                            {isPending ? (
                                <>
                                    <Spinner />{' '}
                                    {isCompleted ? 'Atualizando' : 'Salvando'}
                                </>
                            ) : (
                                <>{isCompleted ? 'Atualizar' : 'Continuar'}</>
                            )}
                        </Button>
                    </FieldSet>
                </form>
            </CardContent>
        </Card >
    );
};

export default CompleteRegistrationStepClinic;
