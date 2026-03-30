
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  Monitor,
  Moon,
  Sun,
} from "lucide-react"
import { Link } from "react-router-dom"


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
import { useSession } from "@/context/SessionContext"


export function NavUser() {
  const { isMobile } = useSidebar()
  const { profile, logout } = useSession()

  const name = profile?.name?.first_name
    ? `${profile.name.first_name} ${profile.name.last_name ?? ""}`.trim()
    : profile?.email ?? "User"

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:-ml-2"
            >
              <Avatar className="h-10 w-10 rounded-lg group-data-[collapsible=icon]:mx-auto">
                <AvatarImage src="" alt={name} />
                <AvatarFallback className="rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{name}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
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
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src="" alt={name} />
                  <AvatarFallback className="rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                    {initials || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                </div>
              </div>
            </DropdownMenuLabel> 
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <BadgeCheck />
                  Account settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
            //    onClick={() => setTheme("light")}
               >
                <Sun />
                Light mode
              </DropdownMenuItem>
              <DropdownMenuItem 
            //   onClick={() => setTheme("dark")}
              >
                <Moon />
                Dark mode
              </DropdownMenuItem>
              <DropdownMenuItem 
            //   onClick={() => setTheme("system")}
              >
                <Monitor />
                System theme
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogOut />
              <button
                type="button"
                className="w-full text-left"
                onClick={() => void logout()}
              >
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
