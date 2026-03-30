export type Employee = {
  id: string
  name: string
  office: string
  birthdate: string
  image?: string
}

export const addDays = (d: Date, days: number) => {
  const dt = new Date(d)
  dt.setDate(dt.getDate() + days)
  return dt
}

export const isWeekday = (d: Date) => {
  const day = d.getDay()
  return day >= 1 && day <= 5
}

export const occurrenceInYear = (birthISO: string, year: number) => {
  const b = new Date(birthISO)
  const month = b.getMonth()
  const date = b.getDate()
  if (month === 1 && date === 29 && !(new Date(year, 1, 29).getDate() === 29)) {
    return new Date(year, 1, 28)
  }
  return new Date(year, month, date)
}

export const getTodaysBirthdays = (employees: Employee[], today: Date) => {
  return employees.filter((emp) => {
    const b = new Date(emp.birthdate)
    return b.getDate() === today.getDate() && b.getMonth() === today.getMonth()
  })
}

export const getUpcomingBirthdays = (employees: Employee[], today: Date) => {
  return employees
    .map((emp) => {
      const thisYear = occurrenceInYear(emp.birthdate, today.getFullYear())
      const occurrence = thisYear > today ? thisYear : occurrenceInYear(emp.birthdate, today.getFullYear() + 1)
      return { emp, occurrence }
    })
    .filter(({ occurrence }) => occurrence > today && occurrence <= addDays(today, 7) && isWeekday(occurrence))
    .sort((a, b) => a.occurrence.getTime() - b.occurrence.getTime())
}

export const getUpcomingGroups = (upcomingBirthdays: { emp: Employee; occurrence: Date }[]) => {
  const map: Record<string, { date: Date; items: Employee[] }> = {}
  upcomingBirthdays.forEach(({ emp, occurrence }) => {
    const key = occurrence.toISOString().slice(0, 10)
    if (!map[key]) map[key] = { date: occurrence, items: [] }
    map[key].items.push(emp)
  })
  return Object.values(map).sort((a, b) => a.date.getTime() - b.date.getTime())
}


export const formatLong = (d: Date) =>
  d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  })

export const formatShort = (d: Date) =>
  d.toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
  })

export const getDaysDifference = (from: Date, to: Date) =>
  Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))


export const TODAY_COLLAPSE_LIMIT = 4
export const UPCOMING_COLLAPSE_LIMIT = 6