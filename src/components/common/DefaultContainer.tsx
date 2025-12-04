import { FC } from "react"

interface DefaultContainerProps {
    children?: React.ReactNode
}

const DefaultContainer: FC<DefaultContainerProps> = ({ children }) => {
    return (
        <div className="p-4 md:p-8 lg:p-12">
            {children}
        </div>
    )
}

export default DefaultContainer