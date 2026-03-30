import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const equipmentOptions = [
  { id: "chairs", label: "Chairs" },
  { id: "sound-system", label: "Sound System" },
  { id: "projector-screens", label: "Projector Screens" },
  { id: "table", label: "Table" },
  { id: "white-board", label: "White Board" },
  { id: "led-wall", label: "Led Wall" },
]

export function BookEventForm() {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="event-name">Event Name</Label>
          <Input id="event-name" placeholder="Event Name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="venue">Venue</Label>
          <Select>
            <SelectTrigger id="venue">
              <SelectValue placeholder="Select venue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="justice-hall-1">Justice Hall Room 1 (Max Limit: 20)</SelectItem>
              <SelectItem value="justice-hall-2">Justice Hall Room 2 (Max Limit: 30)</SelectItem>
            </SelectContent>
          </Select>
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
          <Label htmlFor="position">Position</Label>
          <Select>
            <SelectTrigger id="position">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accountant-i">Accountant I</SelectItem>
              <SelectItem value="accountant-ii">Accountant II</SelectItem>
              <SelectItem value="admin-aide">Administrative Aide</SelectItem>
              <SelectItem value="admin-officer">Administrative Officer</SelectItem>
              <SelectItem value="it-officer">IT Officer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-number">Contact Number</Label>
          <Input id="contact-number" placeholder="Contact number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Email" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="reservation-date-start">Reservation Date Start</Label>
            <Input id="reservation-date-start" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reservation-time-start">Reservation Time</Label>
            <Input id="reservation-time-start" type="time" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="reservation-date-end">Reservation Date End</Label>
            <Input id="reservation-date-end" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reservation-time-end">Reservation Time</Label>
            <Input id="reservation-time-end" type="time" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Equipment</Label>
          <div className="flex flex-wrap gap-4">
            {equipmentOptions.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox id={item.id} />
                <Label htmlFor={item.id} className="font-normal">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pax">PAX</Label>
          <Input id="pax" type="number" placeholder="PAX" />
        </div>

        <Button className="w-full">Submit</Button>
      </CardContent>
    </Card>
  )
}
