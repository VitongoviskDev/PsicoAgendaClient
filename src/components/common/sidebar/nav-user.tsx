import {
  ChevronsUpDown,
  LogOut
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuthContext } from "@/hooks/context/useAuthContext"
import { getInitials } from "@/lib/utils"
import type { IconType } from "react-icons/lib"
import { Link } from "react-router-dom"

export interface NavUserGroup {
  id: string;
  items: NavUserItem[]
}
export interface NavUserItem {
  title: string
  url: string
  icon: IconType
}
export function NavUser({
  groups,
}: {
  groups: NavUserGroup[]
}) {
  const { isMobile } = useSidebar()
  const { user, handleLogout: logoutUser } = useAuthContext();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.profile_picture} alt={user?.name} />
                <AvatarFallback className="rounded-lg">{getInitials(user?.name ?? "")}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.profile_picture} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">{getInitials(user?.name ?? "")}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {groups.map((group) => (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup key={group.id}>
                  {
                    group.items.map(item => (
                      <DropdownMenuItem asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))
                  }
                </DropdownMenuGroup>
              </>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutUser}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
