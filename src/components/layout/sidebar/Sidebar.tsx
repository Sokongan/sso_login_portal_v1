
import {
  Shield,
  Settings,
  CalendarClock,
  ClipboardList,
  LayoutDashboard,
  PiggyBank,
  Package,
  Wallet,
  FileCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import type { NavItem } from "@/types"
import { useSession } from "@/context/SessionContext"
import { NavMain } from "./nav-Main"
import { NavSecondary } from "./nav-Secondary"
import { NavUser } from "./userAccount"



const navMain = [
      { url: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { url: "/payslip", label: "Payslip", icon: Wallet },
      { url: "/provident-fund", label: "Provident Fund", icon: PiggyBank },
      { url: "/issued-equipment", label: "Issued Equipment", icon: Package },
      { url: "/saln", label: "SALN", icon: FileCheck },
      { url: "/request", label: "Request", icon: ClipboardList },
      { url: "/leave", label: "Leave", icon: CalendarClock },

] satisfies NavItem[]

const navSecondary = [
  {
    label: "Administration",
    url: "/admin",
    icon: Shield,
    items: [
      {
        label: "Dashboard",
        url: "/admin",
        icon: Shield,
      },
      {
        label: "Create user",
        url: "/admin/users/new",
        icon: Shield,
      },
    ],
  },
  {
    label: "Config",
    url: "/admin/config",
    icon: Settings,
    items: [
      {
        label: "Roles & permissions",
        url: "/admin/config/roles",
        icon: Settings,
      },
      {
        label: "App access",
        url: "/admin/config/apps",
        icon: Settings,
      },
    ],
  },
] satisfies NavItem[]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { isPortalAdmin } = useSession()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold uppercase tracking-[0.2em] text-white dark:bg-slate-100 dark:text-slate-900 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:-ml-3">
            SSO
          </div>
          <div className="space-y-0.5 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              MyDOJ Portal
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-4 w-auto" />
      <SidebarContent className="px-2 pb-4">
        <NavMain items={navMain} />
        {isPortalAdmin ? (
          <NavSecondary items={navSecondary} className="mt-auto" />
        ) : null}
      </SidebarContent>
      <SidebarFooter className="px-4 pb-4">
        <NavUser />
      </SidebarFooter>
       <SidebarRail />
    </Sidebar>
  )
}
