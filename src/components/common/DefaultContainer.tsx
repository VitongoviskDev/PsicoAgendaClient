import type { FC } from "react"


interface DefaultContainerProps {
    children?: React.ReactNode
    className?: string;
}

const DefaultContainer: FC<DefaultContainerProps> = ({ children, className }) => {
    return (
        <div className={`p-4 md:p-8 lg:p-12 ${className}`}>
            {children}
        </div>
    )
}

export default DefaultContainer