import type { FC } from "react";
import { LuLayoutDashboard, LuSettings, LuUser, LuUsers, LuCalendar } from "react-icons/lu";
import type { IconType } from "react-icons";

interface DefaultIconProps {
    iconName: string;
    className?: string;
}

const icons: Record<string, IconType> = {
    home: LuLayoutDashboard,
    settings: LuSettings,
    user: LuUser,
    users: LuUsers,
    calendar: LuCalendar,
};

const DefaultIcon: FC<DefaultIconProps> = ({ iconName, className }) => {
    const Icon = icons[iconName];
    if (!Icon) return null;
    return <Icon className={className} />;
};

export default DefaultIcon;
