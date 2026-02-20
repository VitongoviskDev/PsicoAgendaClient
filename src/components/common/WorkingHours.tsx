import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Control, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { LuTrash2 } from 'react-icons/lu';
import z from 'zod';

export const workingHourSchema = z.object({
    dayOfWeek: z.number().min(0).max(6),
    openAt: z.string().min(4),
    closeAt: z.string().min(4),
});

export type WorkingHour = z.infer<typeof workingHourSchema>;

export const weekDays = [
    { value: 1, label: 'Segunda' },
    { value: 2, label: 'Terça' },
    { value: 3, label: 'Quarta' },
    { value: 4, label: 'Quinta' },
    { value: 5, label: 'Sexta' },
    { value: 6, label: 'Sábado' },
    { value: 0, label: 'Domingo' },
];

export const workingHoursPresets = {
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

interface WorkingHoursProps {
    control: Control<any>;
    register: UseFormRegister<any>;
    watch: UseFormWatch<any>;
    name: string;
}

export const WorkingHours = ({ control, register, watch, name }: WorkingHoursProps) => {
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name,
    });

    const watchedValue = watch(name);

    return (
        <Card className="bg-zinc-50 border-dashed p-2 flex flex-col">
            <div className="flex flex-row gap-2 mb-3">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => replace(workingHoursPresets.weekDays)}
                >
                    Seg a Sex
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => replace(workingHoursPresets.weekend)}
                >
                    Finais de semana
                </Button>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-40 pr-1 flex-1">
                {fields?.map((field, index) => {
                    const selectedDays = watchedValue?.map((d: any) => d.dayOfWeek) || [];

                    return (
                        <div
                            key={field.id}
                            className="flex items-center gap-2"
                        >
                            <Controller
                                control={control}
                                name={`${name}.${index}.dayOfWeek`}
                                render={({ field }) => (
                                    <Select
                                        value={String(field.value)}
                                        onValueChange={(value) => field.onChange(Number(value))}
                                    >
                                        <SelectTrigger className='w-[140px]'>
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

                            <div className='flex-1 flex items-center gap-2'>
                                <Input
                                    type="time"
                                    className="flex-1 bg-background"
                                    {...register(`${name}.${index}.openAt`)}
                                />

                                <Input
                                    type="time"
                                    className="flex-1 bg-background"
                                    {...register(`${name}.${index}.closeAt`)}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                                onClick={() => remove(index)}
                            >
                                <LuTrash2 className="size-4" />
                            </Button>
                        </div>
                    );
                })}
            </div>

            {fields.length < 7 && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full border-dashed mt-3"
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
        </Card>
    );
};
