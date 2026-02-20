"use client"

import { NavMain, type NavMainItem } from "@/components/common/sidebar/nav-main"
import { NavSecondary, type NavSecondaryItem } from "@/components/common/sidebar/nav-secondary"
import { NavUser, type NavUserGroup } from "@/components/common/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar"
import { LuBadgeCheck, LuBell, LuCalendar, LuChartColumn, LuCreditCard, LuLayoutDashboard, LuLifeBuoy, LuSend, LuSparkles, LuUsers } from "react-icons/lu"
import TeamSwitcher from "./team-switcher"
import { useStaffAccess } from "@/hooks/auth/useStaffAccess"
import { StaffProfileRole } from "@/lib/types/user/user"


interface Nav {
  navMain: (NavMainItem | null)[]
  navSecondary: (NavSecondaryItem | null)[]
  navUser: (NavUserGroup | null)[]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const employee = useStaffAccess({ minRole: StaffProfileRole.EMPLOYEE })
  const admin = useStaffAccess({ minRole: StaffProfileRole.ADMIN })

  const data: Nav = {
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: LuLayoutDashboard,
        isActive: true,
      },
      employee ? {
        title: "Agenda",
        url: "/agenda",
        icon: LuCalendar,
      } : null,
      employee ? {
        title: "Pacientes",
        url: "/patients",
        icon: LuUsers,
      } : null,
      admin ? {
        title: "Administrativo",
        icon: LuChartColumn,
        url: "#"
      } : null,
      {
        title: "Notificações",
        icon: LuBell,
        url: "/notifications"
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LuLifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: LuSend,
      },
    ],
    navUser: [
      {
        id: "",
        items: [
          {
            title: "Upgrade to Pro",
            url: "#/upgrade",
            icon: LuSparkles,
          }
        ]
      },
      {
        id: "",
        items: [
          {
            title: "Perfil",
            url: "/profile",
            icon: LuBadgeCheck
          },
          {
            title: "Billing",
            url: "#/billing",
            icon: LuCreditCard
          }
        ]
      }

    ],
  }

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser groups={data.navUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
