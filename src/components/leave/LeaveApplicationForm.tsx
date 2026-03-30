import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface LeaveApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leaveData?: {
    id: string;
    leaveType: string;
    from: string;
    to: string;
    days: number;
    status: string;
    dateFiled: string;
  };
}

export function LeaveApplicationForm({
  open,
  onOpenChange,
  leaveData,
}: LeaveApplicationFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center py-2">
            APPLICATION FOR LEAVE
          </DialogTitle>
        </DialogHeader>

        <div className="p-0 space-y-4">
          {/* Header Information - Clean Table Style */}
          <div className="border border-slate-400">
            {/* Row 1 */}
            <div className="grid grid-cols-3 border-b border-slate-400">
              <div className="border-r border-slate-400 p-3">
                <p className="text-xs font-bold text-slate-700">NAME:</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">Juan Dela Cruz</p>
              </div>
              <div className="border-r border-slate-400 p-3">
                <p className="text-xs font-bold text-slate-700">OFFICE/DEPARTMENT:</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">HR</p>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-slate-700">DAYS:</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{leaveData?.days}</p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-3 border-b border-slate-400">
              <div className="border-r border-slate-400 p-3">
                <p className="text-xs font-bold text-slate-700">DATE OF FILING:</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{leaveData?.dateFiled}</p>
              </div>
              <div className="border-r border-slate-400 p-3">
                <p className="text-xs font-bold text-slate-700">FRONTIER:</p>
                <p className="text-sm text-slate-900 mt-1">Information Systems, Help Desk</p>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-slate-700">SALARY:</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">60,000.00</p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="p-3">
              <p className="text-xs font-bold text-slate-700 mb-2">DETAILED RES. OF APPLICATION:</p>
              <div className="bg-slate-50 border border-slate-400 p-2">
                <Badge className="bg-green-100 text-green-800 text-xs">{leaveData?.status}</Badge>
              </div>
            </div>
          </div>

          {/* Type of Leave Section */}
          <div className="border border-slate-400">
            <div className="bg-slate-200 p-2 border-b border-slate-400">
              <p className="text-xs font-bold text-slate-800">3. TYPE OF LEAVE TO BE AVAILED OF</p>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-start gap-2">
                <Checkbox id="vacation" checked={leaveData?.leaveType === "Vacation"} className="mt-0.5" />
                <label htmlFor="vacation" className="text-xs text-slate-700 cursor-pointer">
                  Vacation Leave/Accrued Leave (Sec. III, Rule XVI, Omnibus Rules Implementing E.O. No. 292)
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="mantenance" checked={leaveData?.leaveType === "Maintenance"} className="mt-0.5" />
                <label htmlFor="mantenance" className="text-xs text-slate-700 cursor-pointer">
                  Mandatory Leave/Forced Leave (Sec. II, Rule XVI, Omnibus Rules Implementing E.O. No. 292)
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="sick" checked={leaveData?.leaveType === "Sick"} className="mt-0.5" />
                <label htmlFor="sick" className="text-xs text-slate-700 cursor-pointer">
                  Sick Leave (Sec. II, Rule XVI, Omnibus Rules Implementing E.O. No. 292)
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="spl" checked={leaveData?.leaveType === "SPL"} className="mt-0.5" />
                <label htmlFor="spl" className="text-xs text-slate-700 cursor-pointer">
                  Specified Paid Leave (Sec. 12, Rule XVI, Omnibus Rules Implementing E.O. No. 292)
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="special" checked={leaveData?.leaveType === "Special Emergency (Calamity) Leave"} className="mt-0.5" />
                <label htmlFor="special" className="text-xs text-slate-700 cursor-pointer">
                  Special Emergency (Calamity) Leave (Sec. 12, Rule XVI, Omnibus Rules Implementing E.O. No. 292)
                </label>
              </div>
            </div>
          </div>

          {/* Inclusive Dates */}
          <div className="border border-slate-400">
            <div className="bg-slate-200 p-2 border-b border-slate-400">
              <p className="text-xs font-bold text-slate-800">INCLUSIVE DATES</p>
            </div>
            <div className="grid grid-cols-2 gap-0">
              <div className="border-r border-slate-400 p-3">
                <p className="text-xs font-bold text-slate-700">From:</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{leaveData?.from}</p>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-slate-700">To:</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{leaveData?.to}</p>
              </div>
            </div>
          </div>

          {/* Leave Credits */}
          <div className="border border-slate-400">
            <div className="bg-slate-200 p-2 border-b border-slate-400">
              <p className="text-xs font-bold text-slate-800">B. DETAILS OF LEAVE CREDITS</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-400 p-2 text-left font-bold">Type of Leave</th>
                    <th className="border border-slate-400 p-2 text-center font-bold">Balance</th>
                    <th className="border border-slate-400 p-2 text-center font-bold">Absences With Pay</th>
                    <th className="border border-slate-400 p-2 text-center font-bold">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-400 p-2 text-slate-900">Vacation Leave</td>
                    <td className="border border-slate-400 p-2 text-center text-slate-900">44.339</td>
                    <td className="border border-slate-400 p-2 text-center text-slate-900">0</td>
                    <td className="border border-slate-400 p-2 text-center text-slate-900">44.339</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-400 p-2 text-slate-900">Sick Leave</td>
                    <td className="border border-slate-400 p-2 text-center text-slate-900">52</td>
                    <td className="border border-slate-400 p-2 text-center text-slate-900">{leaveData?.days || 0}</td>
                    <td className="border border-slate-400 p-2 text-center text-slate-900 font-semibold">
                      {52 - (leaveData?.days || 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatories Section */}
          <div className="border border-slate-400">
            <div className="bg-slate-200 p-2 border-b border-slate-400">
              <p className="text-xs font-bold text-slate-800">C. CERTIFICATION & AUTHORIZATION</p>
            </div>
            <div className="p-4 space-y-10">
              {/* Certifying Officer */}
              <div className="pb-6 border-b border-slate-300">
                <p className="text-xs font-bold text-slate-800 mb-6">1. CERTIFYING OFFICER</p>
                <div className="space-y-8 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center">
                    <div className="border-b-2 border-slate-400 w-80 h-10"></div>
                    <p className="text-xs font-semibold text-slate-700 mt-2">Signature over Printed Name</p>
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Date</p>
                    <div className="border-b border-slate-400 w-48"></div>
                  </div>
                </div>
              </div>

              {/* Recommending Approval */}
              <div className="pb-6 border-b border-slate-300">
                <p className="text-xs font-bold text-slate-800 mb-6">2. RECOMMENDING APPROVAL</p>
                <div className="space-y-8 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center">
                    <div className="border-b-2 border-slate-400 w-80 h-10"></div>
                    <p className="text-xs font-semibold text-slate-700 mt-2">Signature over Printed Name</p>
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Date</p>
                    <div className="border-b border-slate-400 w-48"></div>
                  </div>
                </div>
              </div>

              {/* Authorized/Disapproved By */}
              <div>
                <p className="text-xs font-bold text-slate-800 mb-6">3. AUTHORIZED/DISAPPROVED BY</p>
                <div className="space-y-8 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center">
                    <div className="border-b-2 border-slate-400 w-80 h-10"></div>
                    <p className="text-xs font-semibold text-slate-700 mt-2">Signature over Printed Name</p>
                  </div>
                  <div className="w-full flex flex-col items-center">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Date</p>
                    <div className="border-b border-slate-400 w-48"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note with Authorized Signatory */}
          <div className="text-center text-xs text-slate-700 py-4 flex flex-col items-center">
            <div className="border-b-2 border-slate-400 w-80 mb-2 h-6"></div>
            <p className="font-bold mt-2">PEDRO GOMEZ</p>
            <p className="text-slate-600 text-xs">Director IV</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
