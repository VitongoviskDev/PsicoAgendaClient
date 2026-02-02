import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { useClinicContext } from '@/hooks/context/useClinicContext';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useStepperContext } from '@/hooks/context/useStepperContext';
import type { CompleteClinicPayload } from '@/lib/types/clinic';
import { getInitials } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuPencil, LuTrash2 } from 'react-icons/lu';
import z from 'zod';

const workingHourSchema = z.object({
    dayOfWeek: z.number().min(0).max(6),
    openAt: z.string().min(4),
    closeAt: z.string().min(4),
});
export const clinicStepFormSchema = z.object({
    name: z.string().min(3, 'Nome da clínica é obrigatório'),
    description: z.string().optional(),
    openedAt: z.date(),
    profilePicture: z.instanceof(File).optional(),
    workingHours: z.array(workingHourSchema).max(7),
});

export type ClinicStepFormData = z.infer<typeof clinicStepFormSchema>;

export const weekDays = [
    { value: 1, label: 'Segunda' },
    { value: 2, label: 'Terça' },
    { value: 3, label: 'Quarta' },
    { value: 4, label: 'Quinta' },
    { value: 5, label: 'Sexta' },
    { value: 6, label: 'Sábado' },
    { value: 0, label: 'Domingo' },
];

const presets = {
    weekDays: [
        { dayOfWeek: 1, openAt: '08:00', closeAt: '18:00' },
        { dayOfWeek: 2, openAt: '08:00', closeAt: '18:00' },
        { dayOfWeek: 3, openAt: '08:00', closeAt: '18:00' },
        { dayOfWeek: 4, openAt: '08:00', closeAt: '18:00' },
        { dayOfWeek: 5, openAt: '08:00', closeAt: '18:00' },
    ],
    weekend: [
        { dayOfWeek: 6, openAt: '09:00', closeAt: '13:00' },
        { dayOfWeek: 0, openAt: '09:00', closeAt: '13:00' },
    ],
};


const CompleteRegistrationStepClinic = () => {
    const { currentClinic, handleCompleteClinic } = useClinicContext();
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
    } = useForm<ClinicStepFormData>({
        resolver: zodResolver(clinicStepFormSchema),
        defaultValues: {
            name: currentClinic?.name ?? '',
            description: currentClinic?.description ?? '',
            openedAt: currentClinic?.openedAt ?? undefined,
            workingHours: currentClinic?.workingHours ?? [],
        },
    });

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'workingHours',
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
        });
    }, [currentClinic, reset]);

    const watchedValues = watch();

    const onSubmit = async (formData: ClinicStepFormData) => {
        try {

            const payload: CompleteClinicPayload = {
                name: formData.name,
                description: formData.description,
                openedAt: formData.openedAt,
                picture: formData.profilePicture,
                workingHours: formData.workingHours
            };

            console.log(payload);

            const response = await handleCompleteClinic(payload);

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
                <form onSubmit={handleSubmit(onSubmit)} className='grid md:grid-cols-3 gap-4'>
                    <Field className='col-span-1 row-span-2 flex flex-col justify-end items-cente'>
                        <div
                            className='relative size-22! flex items-center justify-center group aspect-square! overflow-hidden rounded-full cursor-pointer'
                            onClick={() => fileInputRef?.current?.click()}
                        >
                            <div
                                className='
                                    absolute inset-0 z-1
                                    flex items-center justify-center
                                    bg-zinc-900/50 opacity-0
                                    group-hover:opacity-100
                                    transition-all duration-300'>
                                <LuPencil
                                    className='text-white text-2xl'
                                />
                            </div>
                            <Avatar className="size-full object-fit cursor-pointer">
                                <AvatarImage src={previewImage ?? undefined} />
                                {
                                    !!watchedValues.name ? (
                                        <AvatarFallback>{getInitials(watchedValues.name)}</AvatarFallback>
                                    ) : (
                                        <AvatarFallback className='text-3xl'>#</AvatarFallback>
                                    )
                                }
                            </Avatar>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            disabled={!previewImage}
                            onClick={() => {
                                setValue('profilePicture', undefined, { shouldDirty: true });
                                setPreviewImage("");
                            }}
                            className={`w-full`}
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
                    </Field>

                    <Field className="col-span-2 min-w-0!">
                        <FieldLabel>Nome da clínica</FieldLabel>
                        <Input {...register('name')} />
                        <FieldError>{errors.name?.message}</FieldError>
                    </Field>

                    <Field className="col-span-2">
                        <FieldLabel>Data de abertura</FieldLabel>

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

                                    <PopoverContent className="w-auto p-0">
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
                    </Field>

                    {/* DESCRIÇÃO */}
                    <Field className="col-span-full">
                        <FieldLabel>Descrição</FieldLabel>
                        <Textarea
                            className="h-18 resize-none"
                            {...register('description')}
                        />
                    </Field>

                    <Field className='col-span-full'>
                        <FieldLabel>Horário de funcionamento</FieldLabel>
                        <FieldContent className='grid md:grid-cols-7 gap-4 w-full mt-0'>
                            <div className="col-span-2 flex flex-col gap-2 overflow-y-auto max-h-32">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => replace(presets.weekDays)}
                                >
                                    Seg a Sex
                                </Button>

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => replace(presets.weekend)}
                                >
                                    Finais de semana
                                </Button>
                            </div>

                            <Card className="col-span-5 bg-zinc-50">
                                <CardContent className="space-y-3 overflow-y-auto max-h-32">
                                    {fields?.map((field, index) => {
                                        const selectedDays = watchedValues?.workingHours?.map(d => d.dayOfWeek);

                                        return (
                                            <div
                                                key={field.id}
                                                className="flex items-center gap-2"
                                            >
                                                {/* DIA */}
                                                <Controller
                                                    control={control}
                                                    name={`workingHours.${index}.dayOfWeek`}
                                                    render={({ field }) => (
                                                        <Select
                                                            value={String(field.value)}
                                                            onValueChange={(value) => field.onChange(Number(value))}
                                                        >
                                                            <SelectTrigger className='flex-1'>
                                                                <SelectValue placeholder="Dia" />
                                                            </SelectTrigger>

                                                            <SelectContent>
                                                                {weekDays.map(day => (
                                                                    <SelectItem
                                                                        key={day.value}
                                                                        value={String(day.value)}
                                                                        disabled={
                                                                            selectedDays.includes(day.value) &&
                                                                            day.value !== field.value
                                                                        }
                                                                    >
                                                                        {day.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />

                                                {/* ABERTURA */}
                                                <div className='flex-1 flex items-center justify-start gap-2'>
                                                    <Input
                                                        type="time"
                                                        className="bg-background [&::-webkit-calendar-picker-indicator]:hidden"
                                                        {...register(`workingHours.${index}.openAt`)}
                                                    />

                                                    {/* FECHAMENTO */}
                                                    <Input
                                                        type="time"
                                                        className="bg-background [&::-webkit-calendar-picker-indicator]:hidden"
                                                        {...register(`workingHours.${index}.closeAt`)}
                                                    />
                                                </div>

                                                {/* REMOVER */}
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="text-destructive px-0 md:aspect-square"
                                                    onClick={() => remove(index)}
                                                >
                                                    <LuTrash2 />
                                                </Button>
                                            </div>
                                        );
                                    })}

                                    {fields.length < 7 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                append({
                                                    dayOfWeek: 1,
                                                    openAt: '08:00',
                                                    closeAt: '18:00',
                                                })
                                            }
                                        >
                                            + Adicionar dia
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </FieldContent>
                    </Field>

                    <Field>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="col-span-full"
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
                    </Field>
                </form>
            </CardContent>
        </Card >
    );
};

export default CompleteRegistrationStepClinic;
