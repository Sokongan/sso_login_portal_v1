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
import { usePagination } from "@/hooks/birthday/usePagination";
import { LeaveApplicationForm } from "./LeaveApplicationForm";

const approvedApplications = [
  {
    id: "LV2025-06-00403",
    dateFiled: "26 Jun 2025",
    leaveType: "Sick",
    days: 1,
    status: "Approved",
  },
  {
    id: "LV2025-06-00300",
    dateFiled: "18 Jun 2025",
    leaveType: "Sick",
    days: 1,
    status: "Approved",
  },
  {
    id: "LV2025-06-00228",
    dateFiled: "16 Jun 2025",
    leaveType: "Sick",
    days: 3,
    status: "Approved",
  },
  {
    id: "LV2025-06-00195",
    dateFiled: "12 Jun 2025",
    leaveType: "Sick",
    days: 2,
    status: "Approved",
  },
  {
    id: "LV2025-06-00103",
    dateFiled: "9 Jun 2025",
    leaveType: "Sick",
    days: 1,
    status: "Approved",
  },
  {
    id: "LV2024-12-00622",
    dateFiled: "16 Dec 2024",
    leaveType: "SPL",
    days: 1,
    status: "Approved",
  },
];

export function ApprovedLeaveTable() {
  const { page, totalPages, paginatedItems, goToNextPage, goToPreviousPage } =
    usePagination(approvedApplications);
  const [showForm, setShowForm] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);

  const handleViewClick = (app: any) => {
    setSelectedLeave({
      id: app.id,
      leaveType: app.leaveType,
      from: app.dateFiled,
      to: app.dateFiled,
      days: app.days,
      status: app.status,
      dateFiled: app.dateFiled,
    });
    setShowForm(true);
  };

  return (
    <>
      <Card className="border-0 shadow-lg">
      <CardHeader className="text-black rounded-t-lg">
        <CardTitle className="flex items-center justify-center gap-2">
          Approved/Disapproved
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 border-b-2 border-slate-200">
                <TableHead className="font-bold text-slate-700 text-xs">Control No.</TableHead>
                <TableHead className="font-bold text-slate-700 text-xs">Date Filed</TableHead>
                <TableHead className="font-bold text-slate-700 text-xs">Leave Type</TableHead>
                <TableHead className="font-bold text-slate-700 text-xs">Days</TableHead>
                <TableHead className="font-bold text-slate-700 text-xs">Status</TableHead>
                <TableHead className="font-bold text-slate-700 text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((app) => (
                <TableRow key={app.id} className="hover:bg-slate-50 border-b border-slate-100">
                  <TableCell className="font-mono text-xs text-slate-700">{app.id}</TableCell>
                  <TableCell className="text-xs text-slate-600">{app.dateFiled}</TableCell>
                  <TableCell className="text-xs">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-800 border-blue-300 text-xs"
                    >
                      {app.leaveType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-slate-700">{app.days}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border border-green-300 text-xs">
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewClick(app)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-xs h-6"
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
            <p className="text-xs text-slate-600">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousPage}
                disabled={page === 1}
                className="text-xs h-8"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={page === totalPages}
                className="text-xs h-8"
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