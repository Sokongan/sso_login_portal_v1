"use client"

import {
  LayoutGrid,
  Shield,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./user-account"

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutGrid,
  },
]

const navSecondary = [
  {
    title: "Administration",
    url: "/admin",
    icon: Shield,
    items: [
      {
        title: "Admin console",
        url: "/admin",
        icon: Shield,
      },
      {
        title: "Config",
        url: "/admin/config",
        icon: Settings,
        items: [
          {
            title: "Roles & permissions",
            url: "/admin/config/roles",
            icon: Settings,
          },
          {
            title: "App registration",
            url: "/admin/config/apps",
            icon: Settings,
          },
        ],
      },
    ],
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden border-r border-slate-200/80 dark:border-slate-800/80"
      {...props}
    >
      <SidebarHeader className="px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold uppercase tracking-[0.2em] text-white dark:bg-slate-100 dark:text-slate-900 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:-ml-3">
            SSO
          </div>
          <div className="space-y-0.5 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Portal Nav
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Admin + account
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-4 w-auto" />
      <SidebarContent className="px-2 pb-4">
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="px-4 pb-4">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
