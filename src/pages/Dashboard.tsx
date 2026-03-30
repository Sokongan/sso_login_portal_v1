import { DashboardMenu } from "@/components/dashboard/menu";
import { AppAccess } from "@/components/dashboard/appAccess";
import { AnnouncementBoard } from "@/components/dashboard/annoucementBoard";
import { QuotesTrivia } from "@/components/dashboard/quotesTrivia";
import { BirthdayList } from "@/components/dashboard/birthdayList";
import { ReservationCalendar } from "@/components/dashboard/reservationCalendar";

export function DashboardPage() {
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

    


    </div>
  );
}
