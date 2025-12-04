'use client'
import DefaultContainer from '@/components/common/DefaultContainer';
import { useHeaderContext } from '@/hooks/context/useHeaderContext';

import {
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa6";
import {
    LuCalendar,
    LuCalendarPlus
} from 'react-icons/lu';

import AppointmentCard from '@/components/common/Appointment/appointmentCard';
import AppointmentStatusBadge from '@/components/common/Appointment/appointmentStatusBadge';
import CreateAppointmentDialog from '@/components/common/Modal/CreateAppointmentDialog';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { useDialog } from '@/hooks/context/useDialogContext';
import {
    type Appointment,
    type AppointmentStatus
} from '@/lib/types/appointment';
import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import Badge from '@/components/ui/badge';

const AgendaPage = () => {
    const { setPageTitle, setPageDescription } = useHeaderContext();
    const { openDialog } = useDialog();

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date | undefined>(new Date());

    useEffect(() => {
        setPageTitle("Agenda");
        setPageDescription("Gerencie sua agenda de consultas de forma eficiente e organizada.");
    }, [setPageTitle, setPageDescription]);

    const handleToday = () => {
        setDate(new Date());
        setMonth(new Date());
    };

    const handleNextDay = () => {
        if (!date) return;
        const newDate = addDays(date, 1);
        setDate(newDate);
        setMonth(newDate);
    };

    const handlePreviousDay = () => {
        if (!date) return;
        const newDate = addDays(date, -1);
        setDate(newDate);
        setMonth(newDate);
    };

    function randomStatus() {
        const statuses: AppointmentStatus[] = [
            'confirmed',
            'done',
            'rescheduled',
            'cancelled',
            'absence',
            'waiting'
        ];

        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    function randomName() {
        const names: string[] = [
            'Stephany',
            'Lucas',
            'Mariana',
            'Gabriel',
            'Ana',
            'Rafael',
            'Juliana',
            'Felipe',
            'Camila',
            'Bruno'
        ];

        const lastNames: string[] = [
            'Silva',
            'Santos',
            'Oliveira',
            'Souza',
            'Rodrigues',
            'Ferreira',
            'Almeida',
            'Costa',
            'Gomes',
            'Martins'
        ];
        const name = names[Math.floor(Math.random() * names.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${name} ${lastName}`;
    }

    function randomHour() {
        const hours = Math.floor(Math.random() * 9) + 8; // 8h–16h
        const minutes = Math.random() > 0.5 ? "00" : "30";
        return `${hours.toString().padStart(2, "0")}:${minutes}`;
    }

    function randomDate(day: number) {
        const hour = randomHour();
        return new Date(`2025-01-${day.toString().padStart(2, "0")}T${hour}:00`);
    }

    const [appointments, setAppointments] = useState<Appointment[]>([])
    useEffect(() => {
        setAppointments(
            Array.from({ length: 100 }, (_, i) => {
                const day = (i % 10) + 1; // 1–10
                return {
                    id: i + 1,
                    patientName: randomName(),
                    date: randomDate(day),
                    status: randomStatus(),
                };
            })
        )
    }, []);

    // --- FILTER + SORT ---

    const filteredAppointments = appointments
        .filter(a => {
            if (!date) return false;

            return (
                a.date.getFullYear() === date.getFullYear() &&
                a.date.getMonth() === date.getMonth() &&
                a.date.getDate() === date.getDate()
            );
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());


    return (
        <DefaultContainer>
            <CreateAppointmentDialog dialogKey='agenda-create-appointment' date={date} />

            <Card>
                <CardHeader>
                    <CardTitle className='flex gap-2'>
                        <LuCalendar />
                        Calendário
                    </CardTitle>
                </CardHeader >

                <CardContent className='flex flex-col sm:flex-row items-end justify-between gap-4 flex-wrap'>
                    {/* Legend */}
                    <div className='mt-4'>
                        <p className='font-semibold text-sm'>Legenda</p>
                        <ul className='mt-2'>
                            {legendItems.map((item) => (
                                <li key={item.label} className='flex items-center gap-1 mb-2 text-xs font-semibold'>
                                    <AppointmentStatusBadge status={item.status} />
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Calendar + Controls */}
                    <div className='flex flex-col items-end gap-2 w-full sm:w-sm'>
                        <Calendar
                            mode="single"
                            showOutsideDays={true}
                            selected={date}
                            onSelect={(day) => {
                                if (!day) {
                                    return
                                }
                                setDate(day)
                            }}
                            month={month}
                            onMonthChange={setMonth}
                            className='w-full'
                            captionLayout="dropdown"
                            startMonth={new Date(2025, 0)}                     // from year 2020
                            endMonth={new Date(2030, 12, 4)} // to end of next year
                            disabled={(day) => day > new Date(2030, 11, 31)}
                        />

                        <div className='flex justify-between w-full mb-2'>
                            <Button variant="outline" size="sm" onClick={handleToday}>
                                Hoje
                            </Button>

                            <div className='flex gap-2'>
                                <Button variant="outline" size="sm" onClick={handlePreviousDay}>
                                    <FaChevronLeft className='w-4' />
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleNextDay}>
                                    <FaChevronRight className='w-4' />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card >

            {/* Appointments */}
            < Card className='mt-6' >
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <LuCalendar />
                        Agendamentos para  {date ? date.toLocaleDateString("pt-BR", { weekday: 'long', year: '2-digit', month: 'short', day: 'numeric' }) : 'Select a date'}
                        <Badge rounded className='aspect-square text-xs' color='zinc'>{filteredAppointments.length}</Badge>
                    </CardTitle>
                    <Button className='mt-2' onClick={() => openDialog("agenda-create-appointment")}>
                        <LuCalendarPlus /> Novo Agendamento
                    </Button>
                </CardHeader>

                <CardContent className=''>
                    <ul role="list" className="divide-y divide-white/5">

                        {filteredAppointments.length === 0 && (
                            <li className="py-4 text-sm opacity-70">
                                No appointments for this day.
                            </li>
                        )}

                        {filteredAppointments.map((appointment) => (
                            <li key={appointment.id}>
                                <AppointmentCard appointment={appointment} />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card >
        </DefaultContainer >
    );
};

export default AgendaPage;


interface LegendItem {
    label: string;
    status: AppointmentStatus;
}
const legendItems: LegendItem[] = [
    { label: 'Agurdando', status: 'waiting' },
    { label: 'Confirmado', status: 'confirmed' },
    { label: 'Concluído', status: 'done' },
    { label: 'Reagendado', status: 'rescheduled' },
    { label: 'Cancelado', status: 'cancelled' },
    { label: 'Falta', status: 'absence' },
]