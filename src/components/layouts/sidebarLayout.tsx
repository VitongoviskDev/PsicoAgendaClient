import type { FC } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../app-sidebar"
import Header from "../common/header"
import { Outlet } from "react-router-dom"


const SidebarLayout: FC = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden w-full">
                <Header />
                <main>
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default SidebarLayout