import { DashboardMenu } from "@/components/dashboard/menu";
import { AppAccess } from "@/components/dashboard/appAccess";
import { AnnouncementBoard } from "@/components/dashboard/annoucementBoard";
import { QuotesTrivia } from "@/components/dashboard/quotesTrivia";
import { BirthdayList } from "@/components/dashboard/birthdayList";
import { ReservationCalendar } from "@/components/dashboard/reservationCalendar";
import AdminPanel from "@/components/admin/AdminPanel";
import { useSession } from "@/context/SessionContext";

export function DashboardPage() {
  const { isPortalAdmin } = useSession();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
            <DashboardMenu />
            <AppAccess />
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1.35fr_1fr]">
            <AnnouncementBoard />
            <ReservationCalendar />
          </div>
        </div>

        <div className="space-y-4">
          <BirthdayList />
          <QuotesTrivia />
        </div>
      </div>
      {isPortalAdmin ? (
        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Admin dashboard</h2>
              <p className="mt-2 text-sm text-slate-600">
                User access, identities, and portal administration overview.
              </p>
            </div>
          </div>
          <AdminPanel />
        </section>
      ) : null}
    </div>
  );
}
