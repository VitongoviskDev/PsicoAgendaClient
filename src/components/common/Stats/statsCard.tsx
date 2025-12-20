import { Card, CardTitle } from "@/components/ui/card";
import type { FC } from "react";
import type { IconType } from "react-icons/lib";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";
import { Link } from "react-router-dom";

interface StatsCardProps {
    stats: StatsProps;
}

export interface StatsProps {
    title: string;
    value: StatsValue;
    icon: {
        icon: IconType,
        color: string;
    };
    diff: {
        value: StatsValue,
        text: string;
    };
    link: string;
}

export type StatsValue = {
    value: number;
    isPercentage?: boolean;
};

const StatsCard: FC<StatsCardProps> = ({ stats }) => {
    return (
        <Card className="gap-0 p-4 pb-2 group">
            <div className="flex-1 flex justify-between">
                <div>
                    <CardTitle className="text-zinc-500" >{stats.title}</CardTitle>
                    <h3 className="font-bold text-2xl text-zinc-700">{stats.value.value}{stats.value.isPercentage && "%"}</h3>
                </div>
                <div className={`
                    p-3! rounded-[20%]
                    ${stats.icon.color}    
                `}>
                    <stats.icon.icon className="size-6 text-white" />
                </div>
            </div>
            <div className="flex items-end justify-between h-8 ">
                <div
                    className={`
                    mt-4 flex items-center gap-1
                    ${stats.diff.value.value > 0 ? "text-green-400" : "text-red-400"}
                    `}>
                    {stats.diff.value.value > 0 ? <LuTrendingUp className="size-4" /> : <LuTrendingDown className="size-4" />}
                    <p className="text-xs">
                        {stats.diff.value.value > 0 && "+"}{stats.diff.value.value}{stats.diff.value.isPercentage && "%"} {stats.diff.text}
                    </p>
                </div>
                <Link to={stats.link} className="hidden group-hover:inline-block text-sm text-primary hover:underline underline-offset-2">
                    ver mais
                </Link>
            </div>
        </Card>
    )
}

export default StatsCard