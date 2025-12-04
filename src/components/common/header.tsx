
import { useHeaderContext } from "@/hooks/context/useHeaderContext"
import { type FC } from "react"

interface HeaderProps {
    sidebarTrigger: React.ReactNode
}
const Header: FC<HeaderProps> = ({ sidebarTrigger }) => {
    const { pageTitle, pageDescription } = useHeaderContext()

    return (
        <header className="py-2 flex items-center justify-start gap-4 px-6 border-b bg-background w-full">
            {sidebarTrigger}
            <div className="flex flex-col items-start">
                <h1 className="scroll-m-20 text-center text-2xl font-bold tracking-tight text-balance">
                    {pageTitle}
                </h1>
                <p className="text-xs text-zinc-600 font-semibold">
                    {pageDescription}
                </p>
            </div>
        </header>
    )
}

export default Header
