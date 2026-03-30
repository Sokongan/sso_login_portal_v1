import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmployeeLeaveCardModal } from "./EmployeeLeaveCard";

const leaveTypes = [
  { id: "sick", label: "Sick Leave" },
  { id: "vacation", label: "Vacation" },
  { id: "spl", label: "Specified Paid Leave (SPL)" },
  { id: "emergency", label: "Special Emergency (Calamity) Leave" },
];

export function LeaveForm() {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
  });
  const [showLeaveCard, setShowLeaveCard] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <>
      <Card className="border-0 shadow-lg h-fit">
        <CardHeader className="text-black rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-2">
            New Leave Application
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Leave Type */}
            <div className="space-y-2">
              <Label htmlFor="leaveType" className="text-sm font-semibold text-slate-700">
                Type of Leave
              </Label>
              <Select
                value={formData.leaveType}
                onValueChange={(value) =>
                  setFormData({ ...formData, leaveType: value })
                }
              >
                <SelectTrigger id="leaveType" className="border-slate-300">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* From Date */}
            <div className="space-y-2">
              <Label htmlFor="fromDate" className="text-sm font-semibold text-slate-700">
                From Date
              </Label>
              <Input
                id="fromDate"
                type="date"
                value={formData.fromDate}
                onChange={(e) =>
                  setFormData({ ...formData, fromDate: e.target.value })
                }
                className="border-slate-300"
              />
            </div>

            {/* To Date */}
            <div className="space-y-2">
              <Label htmlFor="toDate" className="text-sm font-semibold text-slate-700">
                To Date
              </Label>
              <Input
                id="toDate"
                type="date"
                value={formData.toDate}
                onChange={(e) =>
                  setFormData({ ...formData, toDate: e.target.value })
                }
                className="border-slate-300"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
            >
              Submit Application
            </Button>

            {/* View Leave Card Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLeaveCard(true)}
              className="w-full text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              View Employee Leave Card
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Employee Leave Card Modal */}
      <EmployeeLeaveCardModal open={showLeaveCard} onOpenChange={setShowLeaveCard} />
    </>
  );
}