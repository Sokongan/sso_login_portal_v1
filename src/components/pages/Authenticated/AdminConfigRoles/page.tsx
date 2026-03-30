import { AppSidebar } from '@/components/layout/sidebar/Sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminConfigRolesPage() {
  return (
        <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-0">
          <section className="grid gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Roles & permissions
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Manage access rules using tuple-based permissions.
                </p>
              </div>
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
                Configure tuple roles and permissions here.
              </div>
            </div>
          </section>
        </div>
  );
}
