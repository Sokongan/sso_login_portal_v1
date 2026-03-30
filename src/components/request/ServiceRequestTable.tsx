import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const serviceRequests = [
  {
    category: "Carpentry",
    description: "Natangal po tile flooring.",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "02/06/2026 1:49 pm",
    status: "Active",
    supportRemarks: "No update",
    supportRatings: "Request is not yet Closed!",
  },
  {
    category: "Carpentry",
    description: "Divider po natangal",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "01/20/2026 4:11 pm",
    status: "Closed",
    supportRemarks: "Done",
    supportRatings: "5-Excellent",
  },
  {
    category: "Carpentry",
    description: "Natangal po Divider",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "01/08/2026 9:06 am",
    status: "Closed",
    supportRemarks: "Done",
    supportRatings: "5-Excellent",
  },
  {
    category: "Aircondition",
    description: "Tumutulo po yung aircon,",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "10/22/2025 8:30 am",
    status: "Closed",
    supportRemarks: "Done",
    supportRatings: "5-Excellent",
  },
  {
    category: "Electrical",
    description: "Lights in the Comfort Room is not working",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "08/13/2025 12:37 pm",
    status: "Closed",
    supportRemarks: "Done",
    supportRatings: "5-Excellent",
  },
  {
    category: "Carpentry",
    description: "Assembly of Desk",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "08/06/2025 2:02 pm",
    status: "Closed",
    supportRemarks: "Done",
    supportRatings: "5-Excellent",
  },
  {
    category: "Telephone",
    description: "No telephone",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "07/31/2025 10:39 am",
    status: "Closed",
    supportRemarks: "Operator",
    supportRatings: "5-Excellent",
  },
  {
    category: "Hardware",
    description: "PC and Printer (end of service)",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "07/15/2025 10:51 am",
    status: "Closed",
    supportRemarks: "",
    supportRatings: "5-Excellent",
  },
  {
    category: "Hardware",
    description: "Printer - Always paper Jam",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "06/16/2025 2:20 pm",
    status: "Closed",
    supportRemarks: "",
    supportRatings: "5-Excellent",
  },
  {
    category: "Carpentry",
    description: "Door on common cr, collapsed.",
    office: "Application Systems Division",
    telLocal: "388",
    requestDate: "05/29/2025 12:21 pm",
    status: "Closed",
    supportRemarks: "Done",
    supportRatings: "5-Excellent",
  },
]

function StatusBadge({ status }: { status: string }) {
  const variant = status === "Active" ? "default" : "secondary"
  return <Badge variant={variant}>{status}</Badge>
}

function RatingBadge({ rating }: { rating: string }) {
  if (rating.includes("Excellent")) {
    return <Badge className="bg-green-600 hover:bg-green-700">{rating}</Badge>
  }
  return <span className="text-sm text-muted-foreground">{rating}</span>
}

export function ServiceRequestTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Office</TableHead>
            <TableHead className="text-center">Tel / Local</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Support Remarks</TableHead>
            <TableHead className="text-center">Support Ratings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serviceRequests.map((req, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{req.category}</TableCell>
              <TableCell>{req.description}</TableCell>
              <TableCell>{req.office}</TableCell>
              <TableCell className="text-center">{req.telLocal}</TableCell>
              <TableCell>{req.requestDate}</TableCell>
              <TableCell className="text-center">
                <StatusBadge status={req.status} />
              </TableCell>
              <TableCell>{req.supportRemarks}</TableCell>
              <TableCell className="text-center">
                <RatingBadge rating={req.supportRatings} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
