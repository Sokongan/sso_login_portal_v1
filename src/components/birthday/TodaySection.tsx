import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { type Employee, TODAY_COLLAPSE_LIMIT } from "@/lib/birthday-utils"

type Props = {
  birthdays: Employee[]
  loading: boolean
}

export function TodaySection({ birthdays, loading }: Props) {
  const [expanded, setExpanded] = useState(false)

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-2xl bg-slate-100 p-6 h-44" />
        ))}
      </div>
    )
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Today's Celebrants</h2>

        {birthdays.length > TODAY_COLLAPSE_LIMIT && (
          <button
            onClick={() => setExpanded((s) => !s)}
            className="text-sm text-primary hover:underline"
          >
            {expanded ? "Collapse" : `Show all (${birthdays.length})`}
          </button>
        )}
      </div>

      {birthdays.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {(expanded
            ? birthdays
            : birthdays.slice(0, TODAY_COLLAPSE_LIMIT)
          ).map((person) => (
            <Card key={person.id} className="rounded-2xl hover:shadow-lg transition ring-1 ring-slate-200">
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <Avatar className="h-20 w-20">
                  {person.image && <AvatarImage src={person.image} />}
                  <AvatarFallback>
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-lg font-semibold">{person.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {person.office}
                  </p>
                </div>

                <Badge variant="secondary">Celebrating Today</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted-foreground">
          No birthdays today
        </div>
      )}
    </section>
  )
}
