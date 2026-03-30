import { Link, Outlet, useLocation } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { routeMeta } from "@/route/index";
import { Footer } from "./footer";


function toLabel(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function AppLayout() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const currentPath = segments.length ? `/${segments.join("/")}` : "/dashboard";
  const currentMeta = routeMeta[currentPath] ?? {
    title: toLabel(segments[segments.length - 1] ?? "dashboard"),
    description: "Portal workspace information and tools.",
  };
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const meta = routeMeta[path];
    return {
      path,
      label: meta?.title ?? toLabel(segment),
    };
  });

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset className="min-h-svh bg-slate-100">
        <header className="relative h-52  md:h-40">
          <img
            src="/hero_sec.png"
            alt="Portal hero background"
            className="h-full w-full object-fit"
          />
          <div className="absolute inset-0 bg-gradient-to-r to-transparent" />
          <div className="absolute inset-0 p-4 pt-8 md:p-6 md:pt-10">
            <div className="flex  text-white">
              <SidebarTrigger className="hover:bg-white/10 hover:text-white" />
            </div>

            <div className="mt-6 md:mt-6">
              <Breadcrumb>
                <BreadcrumbList className="text-white/90">
                  {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <BreadcrumbItem key={crumb.path}>
                        {isLast ? (
                          <BreadcrumbPage className="text-white">{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild className="text-white/90 hover:text-white">
                            <Link to={crumb.path}>{crumb.label}</Link>
                          </BreadcrumbLink>
                        )}
                        {!isLast ? <BreadcrumbSeparator className="text-white/70" /> : null}
                      </BreadcrumbItem>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <p className="mt-3 max-w-2xl text-sm text-white/90 md:text-base">
              {currentMeta.description}
            </p>
          </div>
        </header>

        <main className="min-h-[calc(100svh-64px)] p-4 md:p-6">
          <Outlet />
        </main>      
        <Footer/>     
      </SidebarInset>
    </SidebarProvider>
  );
}
