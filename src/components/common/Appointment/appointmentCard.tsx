import type { FC } from "react";
import { Card, CardContent } from "../../ui/card";
import AppointmentStatusBadge from "./appointmentStatusBadge";
import {
    type Appointment,
    type AppointmentStatus
} from "@/lib/types/appointment";
import type { SessionStatus } from "@/lib/types/session";


interface AppointmentCardProps {
    appointment: Appointment;
}

const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
    const cardStyle: Record<SessionStatus, any> = {
        WAITING_CONFIRMATION: { gradient: 'from-zinc-400 to-white dark:from-zinc-400 dark:to-zinc-900' },
        CONFIRMED: { gradient: 'from-blue-400 to-white dark:from-blue-400 dark:to-zinc-900' },
        COMPLETED: { gradient: 'from-emerald-400 to-white dark:from-emerald-400 dark:to-zinc-900' },
        RESCHEDULED: { gradient: 'from-violet-400 to-white dark:from-violet-400 dark:to-zinc-900' },
        CANCELED: { gradient: 'from-red-400 to-white dark:from-red-400 dark:to-zinc-900' },
        // CANCELED2: { gradient: 'from-orange-400 to-white' },
    };


    return (
        <Card className={`mb-4 p-0.5 bg-linear-to-tr ${cardStyle[appointment.status].gradient}`}>
            <div className='rounded-lg py-6 bg-white dark:bg-zinc-900'>
                <CardContent className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        {
                            appointment.date.toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                    </p>
                    <div className="flex-1 flex justify-between items-center">
                        <p className="font-medium">{appointment.patientName}</p>
                        <AppointmentStatusBadge status={appointment.status} showLabel />
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default AppointmentCard;