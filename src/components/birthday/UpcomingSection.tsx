import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatLong, formatShort, getDaysDifference } from "@/lib/birthday-utils"
import { type Employee, UPCOMING_COLLAPSE_LIMIT } from "@/lib/birthday-utils"

type Group = {
  date: Date
  items: Employee[]
}

type Props = {
  groups: Group[]
  today: Date
}

export function UpcomingSection({ groups, today }: Props) {
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({})
  const [expandedAll, setExpandedAll] = useState(false)

  const displayedGroups = expandedAll
    ? groups
    : groups.slice(0, UPCOMING_COLLAPSE_LIMIT)

  const toggleDate = (key: string) =>
    setExpandedDates((prev) =>
      prev[key] ? {} : { [key]: true }
    )

  if (groups.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No upcoming birthdays this week.
      </p>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Coming Up This Week</h2>
        <p className="text-sm text-muted-foreground">
          Next 7 days (Mon–Fri only)
        </p>
      </div>

      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium">
            {groups.length} date{groups.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          {displayedGroups.map((group) => {
            const key = group.date.toISOString().slice(0, 10)
            const isExpanded = !!expandedDates[key]

            return (
              <div key={key}>
                <div className="flex items-center justify-between py-3 px-2">
                  <div>
                    <p className="text-sm font-medium">
                      {formatLong(group.date)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {group.items.length} people
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {formatShort(group.date)}
                    </span>
                    <Badge className="bg-primary/10 text-primary">
                      {getDaysDifference(today, group.date)}d
                    </Badge>

                    <button
                      onClick={() => toggleDate(key)}
                      className="text-sm text-primary hover:underline"
                    >
                      {isExpanded ? "Hide" : `Show (${group.items.length})`}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="divide-y">
                    {group.items.map((emp) => (
                      <div
                        key={emp.id}
                        className="flex items-center gap-3 py-3 px-3"
                      >
                        <Avatar className="h-8 w-8">
                          {emp.image && <AvatarImage src={emp.image} />}
                          <AvatarFallback className="text-xs">
                            {emp.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="text-sm font-medium">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {emp.office}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {!expandedAll && groups.length > UPCOMING_COLLAPSE_LIMIT && (
            <div className="text-center pt-2">
              <button
                onClick={() => setExpandedAll(true)}
                className="text-sm text-primary hover:underline"
              >
                Show all {groups.length} dates
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
