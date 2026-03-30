import { useBirthdays } from "@/hooks/useBirthdays"
import {
  getTodaysBirthdays,
  getUpcomingBirthdays,
  getUpcomingGroups,
  formatLong
} from "@/lib/birthday-utils"
import { TodaySection } from "@/components/birthday/TodaySection"
import { UpcomingSection } from "@/components/birthday/UpcomingSection"
import { Separator } from "@/components/ui/separator"

export function BirthdayPage() {
  const { employees, loading, error } = useBirthdays()
  const today = new Date()

  const todaysBirthdays = getTodaysBirthdays(employees, today)
  const upcomingBirthdays = getUpcomingBirthdays(employees, today)
  const upcomingGroups = getUpcomingGroups(upcomingBirthdays)

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Birthdays
        </h1>
        <p className="text-sm text-muted-foreground">
          {formatLong(today)}
        </p>
      </div>

      <TodaySection birthdays={todaysBirthdays} loading={loading} />

      <Separator />

      <UpcomingSection groups={upcomingGroups} today={today} />
    </div>
  )
}
