import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

const equipments = [
  {
    number: "1",
    referenceNo: "ICS-2024-001",
    description: "Desktop Computer (Dell OptiPlex 7090)",
    propertyNo: "DOJ-PC-0451",
    qty: "1",
    amount: "₱45,000.00",
  },
  {
    number: "2",
    referenceNo: "ICS-2024-002",
    description: "22-inch LED Monitor (Dell P2222H)",
    propertyNo: "DOJ-MON-0312",
    qty: "1",
    amount: "₱12,500.00",
  },
  {
    number: "3",
    referenceNo: "ICS-2024-003",
    description: "UPS 650VA (APC Back-UPS)",
    propertyNo: "DOJ-UPS-0198",
    qty: "1",
    amount: "₱3,800.00",
  },
  {
    number: "4",
    referenceNo: "ICS-2024-004",
    description: "Keyboard and Mouse Set (Logitech MK270)",
    propertyNo: "DOJ-KBM-0275",
    qty: "1",
    amount: "₱1,500.00",
  },
  {
    number: "5",
    referenceNo: "ICS-2024-005",
    description: "Office Chair (Ergonomic Mesh)",
    propertyNo: "DOJ-FUR-0089",
    qty: "1",
    amount: "₱8,200.00",
  },
  {
    number: "6",
    referenceNo: "ICS-2024-006",
    description: "Steel Filing Cabinet (4-drawer)",
    propertyNo: "DOJ-FUR-0134",
    qty: "1",
    amount: "₱6,500.00",
  },
  {
    number: "7",
    referenceNo: "ICS-2024-007",
    description: "Printer (HP LaserJet Pro M404dn)",
    propertyNo: "DOJ-PRT-0067",
    qty: "1",
    amount: "₱18,900.00",
  },
]

export function IssuedEquipmentPage() {
  return (
    <div className="w-full space-y-4">
        <p>
        List of Property Acknowledgement Receipt Issued
        </p>
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[60px]">#</TableHead>
                <TableHead>Reference No.</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Property No.</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Amount (PHP)</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {equipments.map((item) => (
                <TableRow key={item.referenceNo}>
                    <TableCell className="font-medium">{item.number}</TableCell>
                    <TableCell>{item.referenceNo}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.propertyNo}</TableCell>
                    <TableCell className="text-center">{item.qty}</TableCell>
                    <TableCell className="text-right">{item.amount}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    <p className="mt-4 text-sm text-muted-foreground">
        *Any concern/s regarding share contribution, please coordinate with the Property Management Section.
    </p>
    </div>
  );
}