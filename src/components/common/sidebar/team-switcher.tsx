"use client"

import { ChevronsUpDown, Plus } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useClinicContext } from "@/hooks/context/useClinicContext"
import { getInitials } from "@/lib/utils"
import type { FC } from "react"
import { LuSettings2 } from "react-icons/lu"
import { Avatar, AvatarFallback } from "../../ui/avatar"


const TeamSwitcher: FC = () => {
    const { isMobile } = useSidebar()
    const { currentClinic, clinics, handleSwitchClinic } = useClinicContext();

    return (
        currentClinic &&
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {/* <AvatarImage src={currentClinic.logo} alt={currentClinic.name} /> */}
                                <AvatarFallback className="rounded-lg">{getInitials(currentClinic.name)}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{currentClinic.name}</span>
                                {/* <span className="truncate text-xs">{clinic.plan}</span> */}
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <LuSettings2 className="size-4" />
                            </div>
                            <div className="text-muted-foreground font-medium">Team Settings</div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-muted-foreground text-xs">
                            Teams
                        </DropdownMenuLabel>
                        {clinics.map((cli, index) => (
                            <DropdownMenuItem
                                key={cli.name}
                                onClick={() => handleSwitchClinic(cli)}
                                className="gap-2 p-2"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    {/* <AvatarImage src={cli.logo} alt={cli.name} /> */}
                                    <AvatarFallback className="rounded-lg">{getInitials(cli.name)}</AvatarFallback>
                                </Avatar>
                                {cli.name}
                                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus className="size-4" />
                            </div>
                            <div className="text-muted-foreground font-medium">Add team</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default TeamSwitcher;