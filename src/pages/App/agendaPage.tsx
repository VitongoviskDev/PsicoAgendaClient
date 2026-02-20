'use client'
import DefaultPageContainer from '@/components/common/DefaultPageContainer';

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
import CreateSessionDialog from '@/components/common/Modal/CreateSessionDialog';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { useDialogContext } from '@/hooks/context/useDialogContext';
import {
    type Appointment,
    type AppointmentStatus
} from '@/lib/types/appointment';
import { addDays, isSameDay } from 'date-fns';
import { useEffect, useState } from 'react';
import { useListSessions } from '@/hooks/session/useListSessions';
import { Spinner } from '@/components/ui/spinner';
import Badge from '@/components/ui/badge';
import type { Session, SessionStatus } from '@/lib/types/session';
import ProfileGuard from '@/components/common/Auth/ProfileGuard';
import { StaffProfileRole } from '@/lib/types/user/user';
import StaffRoleGuard from '@/components/common/Auth/StaffRoleGuard';

const AgendaPage = () => {
    const { openDialog } = useDialogContext();

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date | undefined>(new Date());

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

    const { data: sessionsData, isLoading: isLoadingSessions } = useListSessions();


    const appointments: Appointment[] = sessionsData?.data.sessions.map((session: Session) => ({
        id: session.id,
        patientName: session.patient?.user.name || "Paciente",
        date: new Date(session.date),
        status: session.status || 'WAITING_CONFIRMATION|'
    })) || [];

    const filteredAppointments = appointments
        .filter(a => {
            if (!date) return false;
            return isSameDay(a.date, date)
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());


    return (
        <DefaultPageContainer
            headerType="simple"
            title="Agenda"
            description="Gerencie sua agenda de consultas de forma eficiente e organizada."
            breadcrumbs={[{ label: "Agenda" }]}
        >
            <CreateSessionDialog date={date} />

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
            < Card >
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <LuCalendar />
                        Agendamentos para  {date ? date.toLocaleDateString("pt-BR", { weekday: 'long', year: '2-digit', month: 'short', day: 'numeric' }) : 'Select a date'}
                        <Badge rounded className='aspect-square text-xs' color='zinc'>{filteredAppointments.length}</Badge>
                    </CardTitle>
                    <StaffRoleGuard>
                        <Button className='mt-2' onClick={() => openDialog("agenda-create-session")}>
                            <LuCalendarPlus /> Novo Agendamento
                        </Button>
                    </StaffRoleGuard>
                </CardHeader>

                <CardContent className=''>
                    <ul role="list" className="divide-y divide-white/5">

                        {isLoadingSessions && (
                            <li className="py-8 flex justify-center">
                                <Spinner />
                            </li>
                        )}

                        {!isLoadingSessions && filteredAppointments.length === 0 && (
                            <li className="py-4 text-sm opacity-70">
                                No appointments for this day.
                            </li>
                        )}

                        {!isLoadingSessions && filteredAppointments.map((appointment) => (
                            <li key={appointment.id}>
                                <AppointmentCard appointment={appointment} />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card >
        </DefaultPageContainer >
    );
};

export default AgendaPage;


interface LegendItem {
    label: string;
    status: SessionStatus;
}
const legendItems: LegendItem[] = [
    { label: 'Agurdando', status: 'WAITING_CONFIRMATION' },
    { label: 'Confirmado', status: 'CONFIRMED' },
    { label: 'Concluído', status: 'COMPLETED' },
    { label: 'Reagendado', status: 'RESCHEDULED' },
    { label: 'Cancelado', status: 'CANCELED' },
    // { label: 'Falta', status: 'absence' },
]