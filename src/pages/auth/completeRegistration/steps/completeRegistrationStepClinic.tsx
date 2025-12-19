import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useClinicContext } from '@/hooks/context/useClinicContext';
import { useStepperContext } from '@/hooks/context/useStepperContext';

import z from 'zod';
import { LuChevronDown, LuImage, LuTrash2 } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CompleteClinicPayload } from '@/lib/types/clinic';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, getInitials } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const workingHourSchema = z.object({
    dayOfWeek: z.number().min(0).max(6),
    openAt: z.string().min(4),
    closeAt: z.string().min(4),
});
export const clinicStepFormSchema = z.object({
    name: z.string().min(3, 'Nome da clínica é obrigatório'),
    description: z.string().optional(),
    openedAt: z.date().optional(),
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
    const { currentClinic } = useClinicContext();
    // const { completeStep, nextStep } = useStepperContext();

    const [previewImage, setPreviewImage] = useState<string>();
    const fileInputRef = useRef(null);

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
            workingHours: [],
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
                profilePicture: formData.profilePicture,
                // workingHours: formData.workingHours,
            };

            // const response = await handleCompleteClinic(payload);

            // toast.success(response.message);
            // completeStep();
            // nextStep();
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
                <form onSubmit={handleSubmit(onSubmit)} className='grid md:grid-cols-7 gap-4'>
                    <FieldGroup className="row-span-2 col-span-2 flex items-start justify-between gap-0">
                        <Avatar className="size-22">
                            <AvatarImage src={previewImage ?? undefined} />
                            <AvatarFallback>{getInitials(watchedValues?.name ?? '')}</AvatarFallback>
                        </Avatar>

                        <div className="flex items-center gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                className='flex-1'
                                onClick={() => fileInputRef?.current?.click()}
                            >
                                <LuImage className="mr-2" /> Escolher imagem
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={!previewImage}
                                onClick={() => {
                                    setValue('profilePicture', undefined, { shouldDirty: true });
                                    setPreviewImage(undefined);
                                }}
                                className={cn("px-0! aspect-square", previewImage && "text-destructive border-destructive")}
                            >
                                <LuTrash2 />
                            </Button>
                        </div>

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
                    </FieldGroup>

                    <FieldGroup className="col-span-5">
                        <Field className="">
                            <FieldLabel>Nome da clínica</FieldLabel>
                            <Input {...register('name')} />
                            <FieldError>{errors.name?.message}</FieldError>
                        </Field>
                    </FieldGroup>

                    {/* DATA DE ABERTURA */}
                    <Field className="col-span-5">
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
                                    {fields.map((field, index) => {
                                        const selectedDays = watchedValues.workingHours.map(d => d.dayOfWeek);

                                        return (
                                            <div
                                                key={field.id}
                                                className="grid grid-cols-1 md:grid-cols-[1fr_5fr_auto] gap-2 items-end"
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
                                                            <SelectTrigger className='w-full'>
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
                                                <div className='flex items-center justify-start gap-2'>
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
                </form>
            </CardContent>
        </Card>
    );
};

export default CompleteRegistrationStepClinic;
