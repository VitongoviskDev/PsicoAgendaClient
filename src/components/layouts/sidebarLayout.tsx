import type { FC } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import Header from "../common/header"
import { Outlet } from "react-router-dom"


const SidebarLayout: FC = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden">
                <Header sidebarTrigger={<SidebarTrigger />} />
                <main className="p-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default SidebarLayout