import { cn } from "@/lib/utils";
import type { FC, ReactNode } from "react"

interface FilterSectionProps {
    children: ReactNode;
    className?: string;
}

const FilterSection: FC<FilterSectionProps> = ({
    children,
    className
}) => {
    return (
        <section className={cn(
            "flex items-center gap-2",
            className
        )}>
            {children}
        </section>
    )
}

export default FilterSection