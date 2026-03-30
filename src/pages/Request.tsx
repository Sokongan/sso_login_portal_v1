import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceRequestForm } from "@/components/request/ServiceRequestForm"
import { ServiceRequestTable } from "@/components/request/ServiceRequestTable"
import { BookEventForm } from "@/components/request/BookEventForm"
import { BookEventTable } from "@/components/request/BookEventTable"

export function RequestPage() {
  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="service-request">
        <TabsList>
          <TabsTrigger value="service-request">Service Request</TabsTrigger>
          <TabsTrigger value="book-event">Book Event</TabsTrigger>
        </TabsList>

        <TabsContent value="service-request" className="space-y-6">
          <ServiceRequestForm />
          <ServiceRequestTable />
        </TabsContent>

        <TabsContent value="book-event" className="space-y-6">
          <BookEventForm />
          <BookEventTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
