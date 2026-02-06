import { AppSidebar } from '@/components/layout/AppSidebar';
import AdminPanel from '@/components/admin/AdminPanel';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium">Admin console</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-0">
          <AdminPanel />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
