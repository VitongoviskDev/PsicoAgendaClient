
import { useHeaderContext } from "@/hooks/context/useHeaderContext"
import { type FC } from "react"
import { SidebarTrigger } from "../ui/sidebar"

interface HeaderProps {

}
const Header: FC<HeaderProps> = ({ }) => {
    const { pageTitle, pageDescription } = useHeaderContext()

    return (
        <header className="py-2 flex items-center justify-start gap-4 px-6 border-b bg-background w-full">
            <SidebarTrigger className="md:hidden" />
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
