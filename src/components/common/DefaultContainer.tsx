import { cn } from "@/lib/utils";
import type { FC } from "react"


interface DefaultContainerProps {
    children?: React.ReactNode
    className?: string;
}

const DefaultContainer: FC<DefaultContainerProps> = ({ children, className }) => {
    return (
        <div className={cn(`flex flex-col flex-1 p-4 md:p-8`, className)}>
            {children}
        </div>
    )
}

export default DefaultContainer