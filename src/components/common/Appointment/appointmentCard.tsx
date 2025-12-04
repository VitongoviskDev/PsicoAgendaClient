import type { FC } from "react";
import { Card, CardContent } from "../../ui/card";
import AppointmentStatusBadge from "./appointmentStatusBadge";
import {
    type Appointment,
    type AppointmentStatus
} from "@/lib/types/appointment";


interface AppointmentCardProps {
    appointment: Appointment;
}

const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
    const cardStyle: Record<AppointmentStatus, any> = {
        waiting: { gradient: 'from-zinc-400 to-white' },
        confirmed: { gradient: 'from-blue-400 to-white' },
        done: { gradient: 'from-emerald-400 to-white' },
        rescheduled: { gradient: 'from-violet-400 to-white' },
        cancelled: { gradient: 'from-red-400 to-white' },
        absence: { gradient: 'from-orange-400 to-white' },
    };

    return (
        <Card className={`mb-4 p-0.5 bg-linear-to-tr ${cardStyle[appointment.status].gradient}`}>
            <div className='rounded-lg py-6 bg-white'>
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