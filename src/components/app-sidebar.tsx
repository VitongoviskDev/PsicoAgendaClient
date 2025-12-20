"use client"

import { NavMain, type NavMainItem } from "@/components/nav-main"
import { NavSecondary, type NavSecondaryItem } from "@/components/nav-secondary"
import { NavUser, type NavUserGroup } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar"
import { LuBadgeCheck, LuCalendar, LuChartColumn, LuCreditCard, LuLayoutDashboard, LuLifeBuoy, LuSend, LuSettings2, LuSparkles, LuUsers } from "react-icons/lu"
import TeamSwitcher from "./team-switcher"


interface Nav {
  navMain: NavMainItem[]
  navSecondary: NavSecondaryItem[]
  navUser: NavUserGroup[]
}

const data: Nav = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LuLayoutDashboard,
      isActive: true,
    },
    {
      title: "Agenda",
      url: "/agenda",
      icon: LuCalendar,
    },
    {
      title: "Patients",
      url: "/patients",
      icon: LuUsers,
    },
    {
      title: "Settings",
      icon: LuSettings2,
      url: "#"
    },
    {
      title: "Administration",
      icon: LuChartColumn,
      url: "#"
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar variant="inset" {...props}>
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
