import type { FC } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../common/sidebar/app-sidebar"
import { Outlet } from "react-router-dom"
const SidebarLayout: FC = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden w-full">
                <main className="flex-1 flex flex-col h-full overflow-y-auto">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default SidebarLayout