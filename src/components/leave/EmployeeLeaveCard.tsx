import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmployeeLeaveCardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sample employee data - replace with actual data from API
const employeeData = {
  name: "Juan Dela Cruz",
  division: "Application Systems Division",
  firstDayOfService: "Tuesday, 05 January 2021",
  leaveBalance: {
    vacation: {
      earned: 0,
      absUndWP: 0,
      absUndWOP: 0,
      balance: 43.089,
    },
    sick: {
      earned: 0,
      absUndWP: 0,
      absUndWOP: 0,
      balance: 50.75,
    },
  },
  leaveHistory: [
    {
      period: "May-2025",
      particulars: "",
      vacationEarned: 1.25,
      vacationAbsUndWP: 0,
      vacationAbsUndWOP: 0,
      vacationBal: 44.339,
      sickEarned: 0,
      sickAbsUndWP: 1.25,
      sickAbsUndWOP: 0,
      sickBal: 52,
    },
    {
      period: "6/25/2025",
      particulars: "1-0-0",
      vacationEarned: 0,
      vacationAbsUndWP: 0,
      vacationAbsUndWOP: 0,
      vacationBal: 44.339,
      sickEarned: 0,
      sickAbsUndWP: 1,
      sickAbsUndWOP: 0,
      sickBal: 51,
    },
  ],
};

export function EmployeeLeaveCardModal({ open, onOpenChange }: EmployeeLeaveCardModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 justify-center flex">
            Employee Leave Card
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Employee Info */}
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="text-lg text-slate-800">{employeeData.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 font-semibold">Division/Office</p>
                  <p className="text-sm text-slate-800">{employeeData.division}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 font-semibold">1st Day of Service</p>
                  <p className="text-sm text-slate-800">{employeeData.firstDayOfService}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Leave Balance */}
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="text-lg text-slate-800">Leave Balance Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-700">Vacation Leave</h3>
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <p className="text-2xl font-bold text-blue-700">
                      {employeeData.leaveBalance.vacation.balance.toFixed(2)}
                    </p>
                    <p className="text-xs text-blue-600">Available Days</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-700">Sick Leave</h3>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <p className="text-2xl font-bold text-green-700">
                      {employeeData.leaveBalance.sick.balance.toFixed(2)}
                    </p>
                    <p className="text-xs text-green-600">Available Days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leave History Table */}
          <Card className="border-slate-200">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="text-lg text-slate-800">Recent Leave Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b">
                    <th className="px-2 py-2 text-left text-slate-700 font-semibold">Period</th>
                    <th className="px-2 py-2 text-left text-slate-700 font-semibold">Particulars</th>
                    <th colSpan={4} className="px-2 py-2 text-center text-slate-700 font-semibold">
                      Vacation Leave
                    </th>
                    <th colSpan={4} className="px-2 py-2 text-center text-slate-700 font-semibold">
                      Sick Leave
                    </th>
                  </tr>
                  <tr className="bg-slate-50 border-b text-slate-600">
                    <th className="px-2 py-1"></th>
                    <th className="px-2 py-1"></th>
                    <th className="px-2 py-1 text-center">Earned</th>
                    <th className="px-2 py-1 text-center">Abs. UND. W/P</th>
                    <th className="px-2 py-1 text-center">Abs. UND. W/O P</th>
                    <th className="px-2 py-1 text-center">Bal.</th>
                    <th className="px-2 py-1 text-center">Earned</th>
                    <th className="px-2 py-1 text-center">Abs. UND. W/P</th>
                    <th className="px-2 py-1 text-center">Abs. UND. W/O P</th>
                    <th className="px-2 py-1 text-center">Bal.</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.leaveHistory.map((record, idx) => (
                    <tr key={idx} className="border-b hover:bg-slate-50">
                      <td className="px-2 py-2 text-slate-700">{record.period}</td>
                      <td className="px-2 py-2 text-slate-700">{record.particulars}</td>
                      <td className="px-2 py-2 text-center text-slate-700">{record.vacationEarned}</td>
                      <td className="px-2 py-2 text-center text-slate-700">{record.vacationAbsUndWP}</td>
                      <td className="px-2 py-2 text-center text-slate-700">{record.vacationAbsUndWOP}</td>
                      <td className="px-2 py-2 text-center text-slate-700 font-semibold">
                        {record.vacationBal}
                      </td>
                      <td className="px-2 py-2 text-center text-slate-700">{record.sickEarned}</td>
                      <td className="px-2 py-2 text-center text-slate-700">{record.sickAbsUndWP}</td>
                      <td className="px-2 py-2 text-center text-slate-700">{record.sickAbsUndWOP}</td>
                      <td className="px-2 py-2 text-center text-slate-700 font-semibold">
                        {record.sickBal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <p className="text-xs text-slate-500 italic text-center">
            Abs. UND. W/P = Absence Under With Pay | Abs. UND. W/O P = Absence Under Without Pay
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
