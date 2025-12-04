import Badge from "@/components/ui/badge";
import {
    type AppointmentStatus
} from "@/lib/types/appointment";
import type { FC } from "react";
import { FaExclamation } from "react-icons/fa6";
import { LuCheck, LuCheckCheck, LuClock, LuRotateCcw, LuX } from "react-icons/lu";

interface AppointmentStatusBadgeProps {
    status: AppointmentStatus;
    showLabel?: boolean;
    className?: string;
}
const AppointmentStatusBadge: FC<AppointmentStatusBadgeProps> = ({ status, showLabel, className }) => {

    const statusBadge: Record<AppointmentStatus, any> = {
        waiting: { label: 'Aguardando', icon: <LuClock />, color: 'zinc' },
        confirmed: { label: 'Confirmado', icon: <LuCheck />, color: 'blue' },
        done: { label: 'Concluído', icon: <LuCheckCheck />, color: 'emerald' },
        rescheduled: { label: 'Reagendado', icon: <LuRotateCcw />, color: 'violet' },
        cancelled: { label: 'Cancelado', icon: <LuX />, color: 'red' },
        absence: { label: 'Falta', icon: <FaExclamation />, color: 'orange' },

    };

    return (
        <Badge color={statusBadge[status].color} rounded className={className}>
            {statusBadge[status].icon}

            {showLabel && <span className='ml-1 text-xs font-semibold'>{statusBadge[status].label}</span>}
        </Badge>
    )
}

export default AppointmentStatusBadge;