import Badge from "@/components/ui/badge";
import type { SessionStatus } from "@/lib/types/session";
import type { FC } from "react";
import { LuCheck, LuCheckCheck, LuClock, LuRotateCcw, LuX } from "react-icons/lu";

interface AppointmentStatusBadgeProps {
    status: SessionStatus;
    showLabel?: boolean;
    className?: string;
}
const AppointmentStatusBadge: FC<AppointmentStatusBadgeProps> = ({ status, showLabel, className }) => {

    const statusBadge: Record<SessionStatus, any> = {
        WAITING_CONFIRMATION: { label: 'Aguardando', icon: <LuClock />, color: 'zinc' },
        CONFIRMED: { label: 'Confirmado', icon: <LuCheck />, color: 'blue' },
        COMPLETED: { label: 'Concluído', icon: <LuCheckCheck />, color: 'emerald' },
        RESCHEDULED: { label: 'Reagendado', icon: <LuRotateCcw />, color: 'violet' },
        CANCELED: { label: 'Cancelado', icon: <LuX />, color: 'red' },
        // absence: { label: 'Falta', icon: <FaExclamation />, color: 'orange' },
    };

    return (
        <Badge color={statusBadge[status].color} rounded className={className}>
            {statusBadge[status].icon}

            {showLabel && <span className='ml-1 text-xs font-semibold'>{statusBadge[status].label}</span>}
        </Badge>
    )
}

export default AppointmentStatusBadge;