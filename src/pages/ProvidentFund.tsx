import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

const transactions = [
  {
    date: "01/15/2025",
    orVoucherNo: "312",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,500.00",
  },
  {
    date: "02/14/2025",
    orVoucherNo: "314",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,500.00",
  },
  {
    date: "03/15/2025",
    orVoucherNo: "317",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,500.00",
  },
  {
    date: "04/15/2025",
    orVoucherNo: "319",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,500.00",
  },
  {
    date: "05/15/2025",
    orVoucherNo: "321",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,500.00",
  },
  {
    date: "06/13/2025",
    orVoucherNo: "324",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,500.00",
  },
  {
    date: "07/15/2025",
    orVoucherNo: "326",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,200.00",
  },
  {
    date: "08/15/2025",
    orVoucherNo: "330",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,200.00",
  },
  {
    date: "09/15/2025",
    orVoucherNo: "332",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,500.00",
  },
  {
    date: "10/15/2025",
    orVoucherNo: "335",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,500.00",
  },
    {
    date: "10/15/2025",
    orVoucherNo: "337",
    particulars: "Provident Monthly Contribution",
    amount: "₱1,500.00",
  },
]

export function ProvidentFundPage() {
  return (
    <div className="w-full space-y-4">
      <p>
      Share Contributions  
      </p>
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>OR/Voucher No.</TableHead>
                <TableHead>Particulars</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((txn) => (
                <TableRow key={txn.orVoucherNo}>
                    <TableCell className="font-medium">{txn.date}</TableCell>
                    <TableCell>{txn.orVoucherNo}</TableCell>
                    <TableCell>{txn.particulars}</TableCell>
                    <TableCell className="text-right">{txn.amount}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">₱14,400.00</TableCell>
                </TableRow>
            </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
      <p className="mt-4 text-sm text-muted-foreground">
        *Any concern/s regarding share contribution, please coordinate with the DOJ Provident Fund
      </p>
    </div>
  );
}