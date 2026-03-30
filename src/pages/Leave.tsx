import { LeaveForm } from "@/components/leave/LeaveForm";
import { ApprovedLeaveTable } from "@/components/leave/ApprovedLeaveTable";
import { PendingLeaveTable } from "@/components/leave/PendingLeaveTable";

export default function Leave() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Section: Application Form (Left) & Approved Applications (Right) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          {/* Application Form */}
          <LeaveForm />

          {/* Approved/Disapproved Applications */}
          <ApprovedLeaveTable />
        </div>

        {/* Bottom Section: Pending Applications (Full Width) */}
        <PendingLeaveTable />
      </div>
    </div>
  );
}
