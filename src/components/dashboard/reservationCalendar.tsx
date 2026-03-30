import { Calendar } from "@/components/ui/calendar";

const reservationDates = [
  new Date(2026, 1, 2),
  new Date(2026, 1, 4),
  new Date(2026, 1, 11),
  new Date(2026, 1, 12),
  new Date(2026, 1, 24),
];

export function ReservationCalendar() {
  return (
    <section className="rounded-lg border border-slate-300 bg-white p-3 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold text-slate-900">Justice Hall Reservation</h3>
      <Calendar
        mode="single"
        month={new Date(2026, 1, 1)}
        defaultMonth={new Date(2026, 1, 1)}
        className="p-0"
        classNames={{ root: "w-full" }}
        modifiers={{ reserved: reservationDates }}
        modifiersClassNames={{
          reserved:
            "bg-emerald-100 text-emerald-800 font-semibold ring-1 ring-emerald-300 rounded-md",
        }}
      />
      <p className="mt-2 text-xs text-slate-600">Reserved: Feb 2, 4, 11, 12, 24</p>
    </section>
  );
}
