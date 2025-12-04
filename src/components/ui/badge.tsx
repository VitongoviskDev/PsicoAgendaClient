import React from "react";
import { cn } from "@/lib/utils";

type BadgeColor =
    | "zinc"
    | "red"
    | "yellow"
    | "orange"
    | "green"
    | "lime"
    | "emerald"
    | "blue"
    | "indigo"
    | "purple"
    | "violet"
    | "pink"
    | "rose"

const badgeColors: Record<BadgeColor, { bg: string; text: string; ring: string }> = {
    zinc: {
        bg: "bg-zinc-400/10",
        text: "text-zinc-400",
        ring: "inset-ring inset-ring-zinc-400/50",
    },
    red: {
        bg: "bg-red-400/10",
        text: "text-red-400",
        ring: "inset-ring inset-ring-red-400/50",
    },
    yellow: {
        bg: "bg-yellow-400/10",
        text: "text-yellow-400",
        ring: "inset-ring inset-ring-yellow-400/50",
    },
    orange: {
        bg: "bg-orange-400/10",
        text: "text-orange-400",
        ring: "inset-ring inset-ring-orange-400/50",
    },
    green: {
        bg: "bg-green-400/10",
        text: "text-green-400",
        ring: "inset-ring inset-ring-green-400/50",
    },
    lime: {
        bg: "bg-lime-400/10",
        text: "text-lime-400",
        ring: "inset-ring inset-ring-lime-400/50",
    },
    emerald: {
        bg: "bg-emerald-400/10",
        text: "text-emerald-400",
        ring: "inset-ring inset-ring-emerald-400/50",
    },
    blue: {
        bg: "bg-blue-400/10",
        text: "text-blue-400",
        ring: "inset-ring inset-ring-blue-400/50",
    },
    indigo: {
        bg: "bg-indigo-400/10",
        text: "text-indigo-400",
        ring: "inset-ring inset-ring-indigo-400/50",
    },
    purple: {
        bg: "bg-purple-400/10",
        text: "text-purple-400",
        ring: "inset-ring inset-ring-purple-400/50",
    },
    violet: {
        bg: "bg-violet-400/10",
        text: "text-violet-400",
        ring: "inset-ring inset-ring-violet-400/50",
    },
    pink: {
        bg: "bg-pink-400/10",
        text: "text-pink-400",
        ring: "inset-ring inset-ring-pink-400/50",
    },
    rose: {
        bg: "bg-rose-400/10",
        text: "text-rose-400",
        ring: "inset-ring inset-ring-rose-400/50",
    },
};

export interface BadgeProps {
    color?: BadgeColor;
    children: React.ReactNode;
    className?: string;
    rounded?: boolean;
}

const Badge = ({ color = "zinc", children, className, rounded }: BadgeProps) => {
    const colorClasses = badgeColors[color];
    const roundedClass = rounded ? "rounded-full" : "rounded-md";

    return (
        <span
            className={cn(
                "flex items-center px-2 py-1 text-xs text-center font-medium w-fit",
                roundedClass,
                colorClasses.bg,
                colorClasses.text,
                colorClasses.ring,
                className
            )}
        >
            {children}
        </span>
    );
};

export default Badge;
