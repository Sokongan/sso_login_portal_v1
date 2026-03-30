import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const bookings = [
  {
    dateRequested: "01/20/2025 09:39:33",
    event: "DMS 2.0 PRESENTATION",
    venue: "Justice Hall Room 2",
    bookingDate: "01/31/2025 09:00 to 01/31/2025 12:00",
    pax: 30,
    status: "APPROVED",
    equipment: "Chairs, Led Wall",
    action: null,
  },
  {
    dateRequested: "01/20/2025 09:38:17",
    event: "DMS 2.0 PRESENTATION",
    venue: "Justice Hall Room 1",
    bookingDate: "01/31/2025 09:00 to 01/31/2025 12:00",
    pax: 20,
    status: "APPROVED",
    equipment: "Chairs, Led Wall",
    action: null,
  },
  {
    dateRequested: "06/27/2023 10:31:48",
    event: "PRESENT DMS TO NBI",
    venue: "Justice Hall Room 1",
    bookingDate: "07/04/2023 14:00 to 07/04/2023 17:00",
    pax: 15,
    status: "APPROVED",
    equipment: "Chairs, Sound system, Projector screen, Table, Whiteboard",
    action: null,
  },
  {
    dateRequested: "05/22/2023 10:04:27",
    event: "FORENSIC TOOLS WORKSHOP",
    venue: "Justice Hall Room 1",
    bookingDate: "05/24/2023 08:00 to 05/25/2023 17:00",
    pax: 20,
    status: "PENDING",
    equipment: "Chairs, Sound system, Projector screen, Table, Whiteboard",
    action: "cancel",
  },
]

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "APPROVED":
      return <Badge className="bg-green-600 hover:bg-green-700">{status}</Badge>
    case "PENDING":
      return <Badge variant="outline" className="border-yellow-500 text-yellow-600">{status}</Badge>
    case "CANCELLED":
      return <Badge variant="destructive">{status}</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function BookEventTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date Requested</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Booking Date</TableHead>
            <TableHead className="text-center">Pax</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Equipment</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium whitespace-nowrap">{booking.dateRequested}</TableCell>
              <TableCell>{booking.event}</TableCell>
              <TableCell>{booking.venue}</TableCell>
              <TableCell className="whitespace-nowrap">{booking.bookingDate}</TableCell>
              <TableCell className="text-center">{booking.pax}</TableCell>
              <TableCell className="text-center">
                <StatusBadge status={booking.status} />
              </TableCell>
              <TableCell>{booking.equipment}</TableCell>
              <TableCell className="text-center">
                {booking.action === "cancel" ? (
                  <Button variant="destructive" size="sm">
                    Cancel
                  </Button>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
