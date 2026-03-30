import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ServiceRequestForm() {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="type-of-request">Type of Request</Label>
          <Select>
            <SelectTrigger id="type-of-request">
              <SelectValue placeholder="Select type of request" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="repair">Repair</SelectItem>
              <SelectItem value="installation">Installation</SelectItem>
              <SelectItem value="replacement">Replacement</SelectItem>
              <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="carpentry">Carpentry</SelectItem>
              <SelectItem value="aircondition">Aircondition</SelectItem>
              <SelectItem value="telephone">Telephone</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Request / Problem Description</Label>
          <Input id="description" placeholder="Enter description" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="office">Office</Label>
          <Select>
            <SelectTrigger id="office">
              <SelectValue placeholder="Select office" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accounting">Accounting Division</SelectItem>
              <SelectItem value="admin">Administrative Division</SelectItem>
              <SelectItem value="application-systems">Application Systems Division</SelectItem>
              <SelectItem value="budget">Budget Division</SelectItem>
              <SelectItem value="legal">Legal Division</SelectItem>
              <SelectItem value="records">Records Division</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="telephone">Telephone / Local</Label>
          <Input id="telephone" placeholder="Enter telephone / local number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="datetime">Date / Time</Label>
          <Input id="datetime" type="text" value={new Date().toLocaleString("en-US", { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })} readOnly className="bg-muted" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="remarks">Remarks</Label>
          <Textarea id="remarks" placeholder="Enter remarks" />
        </div>

        <Button className="w-full">Send Request</Button>

        <p className="text-sm font-semibold text-orange-600">
          Note: Please leave a feedback when the request is finished or closed. Thank you!
        </p>
      </CardContent>
    </Card>
  )
}
