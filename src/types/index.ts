import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

export type NavChildItem = {
  label: string;
  url: string;
  icon?: LucideIcon;
};

export type NavItem = NavChildItem & {
  items?: NavChildItem[];
};

export type SidebarNavProps = {
  items: NavItem[];
} & ComponentPropsWithoutRef<typeof import("@/components/ui/sidebar").SidebarGroup>;
