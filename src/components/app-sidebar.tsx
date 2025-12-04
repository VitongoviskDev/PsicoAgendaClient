"use client"

import {
  BadgeCheck,
  BookOpen,
  Command,
  CreditCard,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  Sparkles
} from "lucide-react"
import * as React from "react"

import { NavMain, type NavMainItem } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary, type NavSecondaryItem } from "@/components/nav-secondary"
import { NavUser, type NavUserGroup } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LuCalendar, LuLayoutDashboard } from "react-icons/lu"
import { Link } from "react-router-dom"
import { useAuthContext } from "@/hooks/context/useAuthContext"
import type { IconType } from "react-icons/lib"

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
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  navUser: [
    {
      id: "",
      items: [
        {
          title: "Upgrade to Pro",
          url: "#/upgrade",
          icon: Sparkles,
        }
      ]
    },
    {
      id: "",
      items: [
        {
          title: "Perfil",
          url: "/profile",
          icon: BadgeCheck
        },
        {
          title: "Billing",
          url: "#/billing",
          icon: CreditCard
        }
      ]
    }

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { user } = useAuthContext();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
