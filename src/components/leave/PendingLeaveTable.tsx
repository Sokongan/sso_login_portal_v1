import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { usePagination } from "@/hooks/usePagination";
import { LeaveApplicationForm } from "./LeaveApplicationForm";

const pendingApplications = [
  {
    id: "LV2025-07-00040",
    dateFiled: "24 Jul 2025",
    leaveType: "Special Emergency (Calamity) Leave",
    from: "22 Aug 2025",
    to: "22 Aug 2025",
    days: 1,
  },
  {
    id: "LV2025-08-00136",
    dateFiled: "4 Aug 2025",
    leaveType: "Special Emergency (Calamity) Leave",
    from: "11 Aug 2025",
    to: "11 Aug 2025",
    days: 1,
  },
  {
    id: "LV2025-06-01120",
    dateFiled: "25 Aug 2025",
    leaveType: "SPL",
    from: "26 Aug 2025",
    to: "26 Aug 2025",
    days: 1,
  },
  {
    id: "LV2025-12-01143",
    dateFiled: "25 Dec 2025",
    leaveType: "SPL",
    from: "26 Dec 2025",
    to: "26 Dec 2025",
    days: 1,
  },
  {
    id: "LV2026-01-00679",
    dateFiled: "30 Jan 2026",
    leaveType: "SPL",
    from: "6 Mar 2026",
    to: "8 Mar 2026",
    days: 1,
  },
  {
    id: "LV2026-01-00682",
    dateFiled: "30 Jan 2026",
    leaveType: "Vacation",
    from: "22 Oct 2026",
    to: "22 Oct 2026",
    days: 1,
  },
];

export function PendingLeaveTable() {
  const { page, totalPages, paginatedItems, goToNextPage, goToPreviousPage } =
    usePagination(pendingApplications);
  const [showForm, setShowForm] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);

  const handleViewClick = (app: any) => {
    setSelectedLeave({
      id: app.id,
      leaveType: app.leaveType,
      from: app.from,
      to: app.to,
      days: app.days,
      status: "Pending",
      dateFiled: app.dateFiled,
    });
    setShowForm(true);
  };

  return (
    <>
      <Card className="border-0 shadow-lg">
      <CardHeader className="text-black rounded-t-lg">
        <CardTitle className="flex items-center justify-center gap-2">
          Pending Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 border-b-2 border-slate-200">
                <TableHead className="font-bold text-slate-700">Control No.</TableHead>
                <TableHead className="font-bold text-slate-700">Date Filed</TableHead>
                <TableHead className="font-bold text-slate-700">Leave Type</TableHead>
                <TableHead className="font-bold text-slate-700">From</TableHead>
                <TableHead className="font-bold text-slate-700">To</TableHead>
                <TableHead className="font-bold text-slate-700">Days</TableHead>
                <TableHead className="font-bold text-slate-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((app) => (
                <TableRow key={app.id} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell className="font-mono text-sm text-slate-700">{app.id}</TableCell>
                  <TableCell className="text-sm text-slate-600">{app.dateFiled}</TableCell>
                  <TableCell className="text-sm">
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-800 border-amber-300"
                    >
                      {app.leaveType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{app.from}</TableCell>
                  <TableCell className="text-sm text-slate-600">{app.to}</TableCell>
                  <TableCell className="text-sm font-semibold text-slate-700">{app.days}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewClick(app)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={page === 1}
                className="text-sm h-8"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={page === totalPages}
                className="text-sm h-8"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      </Card>

      {/* Leave Application Form Modal */}
      <LeaveApplicationForm
        open={showForm}
        onOpenChange={setShowForm}
        leaveData={selectedLeave}
      />
    </>
  );
}