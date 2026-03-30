import type { ComponentPropsWithoutRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/types";

type NavMainProps = {
  items: NavItem[];
} & ComponentPropsWithoutRef<typeof SidebarGroup>;

export function NavMain({ items, ...props }: NavMainProps) {
  const location = useLocation();

  const isRouteActive = (to: string) => {
    if (location.pathname === to) return true;
    return location.pathname.startsWith(`${to}/`);
  };

  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel className="uppercase tracking-[0.3em] text-slate-500">
        Platform
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={isRouteActive(item.url)}
                tooltip={item.label}
                className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:-ml-1"
              >
                <NavLink to={item.url}>
                  {item.icon ? <item.icon className="size-4 shrink-0" /> : null}
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
