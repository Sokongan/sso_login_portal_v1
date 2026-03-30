import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, Plus } from "lucide-react"

const today = new Date()
const formattedDate = today.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

const initialChildrenData = [
  { name: "N/A", dateOfBirth: "N/A", age: "N/A" },
]

const initialRealProperties = [
  {
    description: "LOT",
    kind: "RESIDENTIAL",
    exactLocation: "LOT 9, BLK. 12, PHASE 2, CONGRESS VILL MANGGAHAN, RODRIGUEZ RIZAL",
    assessedValue: "No tax declaration",
    currentFairMarketValue: "No tax declaration",
    yearAcquired: "2020",
    mode: "INHERITANCE",
    acquisitionCost: "0.00",
    owner: "D",
  },
]

const initialPersonalProperties = [
  {
    description: "Motor Vehicle - MOTORCYCLE",
    yearAcquired: "2018",
    acquisitionCostAmount: "70,400.00",
    owner: "D",
  },
  {
    description: "Cash in Bank and/or on Hand - CASH IN BANK AND/OR ON HAND - CASH IN BANK",
    yearAcquired: "2019 - PRESENT",
    acquisitionCostAmount: "110,000.00",
    owner: "D",
  },
  {
    description: "- GADGETS",
    yearAcquired: "2019 - PRESENT",
    acquisitionCostAmount: "300,000.00",
    owner: "D",
  },
]

const initialLiabilities = [
  { nature: "N/A", nameOfCreditors: "N/A", outstandingBalance: "N/A", owner: "N/A" },
]

const initialBusinessInterests = [
  {
    entityName: "N/A",
    businessAddress: "N/A",
    natureOfBusiness: "N/A",
    dateOfAcquisition: "N/A",
    owner: "N/A",
  },
]

const initialRelativesInGovernment = [
  {
    name: "EVA F. SANTOS",
    relationship: "AUNT",
    position: "CHIEF OF MUNICIPAL ASSESSOR'S OFFICE",
    agencyAddress: "MUNICIPALITY OF RODRIGUEZ RIZAL",
  },
  {
    name: "FRANCISCO T. SANTOS",
    relationship: "FATHER",
    position: "BUILDING INSPECTOR",
    agencyAddress: "MPDO, MUNICIPALITY OF RODRIGUEZ RIZAL",
  },
]

export function SalnPage() {
  const [detailsData] = useState({
    asOfDate: formattedDate,
    typeOfFiling: "Not Applicable",
    declarantAddress: "44 P. ALEJANDRO ST. VICTORIA COMPOUND, RODRIGUEZ, RIZAL",
  })

  const signatureData = {
    dojIdNo: "DOJ 210061",
    dojIdDateIssued: "31 May 2024",
    spouseGovtIssuedId: "N/A",
    spouseIdNo: "N/A",
    spouseDateIssued: "N/A",
  }

  const [childrenData, setChildrenData] = useState(initialChildrenData)
  const [realProperties, setRealProperties] = useState(initialRealProperties)
  const [personalProperties, setPersonalProperties] = useState(initialPersonalProperties)
  const [liabilities, setLiabilities] = useState(initialLiabilities)
  const [businessInterests, setBusinessInterests] = useState(initialBusinessInterests)
  const [relativesInGovernment, setRelativesInGovernment] = useState(initialRelativesInGovernment)

  function handleDeleteAll() {
    if (!window.confirm("Are you sure you want to delete all SALN data? This cannot be undone.")) return
    setChildrenData([])
    setRealProperties([])
    setPersonalProperties([])
    setLiabilities([])
    setBusinessInterests([])
    setRelativesInGovernment([])
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="w-full space-y-6">
      {/* Reference Links */}
      <div className="flex gap-2 pt-2">
        <a
          href="https://www.csc.gov.ph/phocadownload/MC2015/Resolution-1500088.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline"
        >
          CSC Resolution 1500088 dated 23 JAN 2015
        </a>
        <span className="text-muted-foreground">|</span>
        <a
          href="https://www.csc.gov.ph/phocadownload/SALN/SALN-FAQ.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline"
        >
          Frequently Asked Questions (FAQ) on the SALN
        </a>
        <span className="text-muted-foreground">|</span>
        <a
          href="https://www.csc.gov.ph/phocadownload/SALN/Sample-Filled-Up-SALN-Form.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline"
        >
          Sample Filled-Up SALN Form
        </a>
      </div>
      <p className="text-sm text-muted-foreground">1. This form must be printed in a long bond paper.</p>
      <p className="text-sm text-muted-foreground">2. The declarant/s shall sign every page of the additional sheets, if any.</p>
      <p className="text-sm text-muted-foreground">3. To clear all data, click &apos;Delete All SALN Data&apos; button at the bottom.</p>

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>As of Date*</Label>
              <Input value={detailsData.asOfDate} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Type of Filing*</Label>
              <Select defaultValue="not-applicable">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-applicable">Not Applicable</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="assumption">Assumption of Office</SelectItem>
                  <SelectItem value="separation">Separation from Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Declarant Address*</Label>
              <Input value={detailsData.declarantAddress} readOnly className="bg-muted" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-1 h-4 w-4" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Unmarried Children */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            Unmarried Children Under Eighteen (18) Years of Age Living in Declarant&apos;s House
          </CardTitle>
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Age</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {childrenData.map((child, i) => (
                <TableRow key={i}>
                  <TableCell>{child.name}</TableCell>
                  <TableCell>{child.dateOfBirth}</TableCell>
                  <TableCell>{child.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Real Properties */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">a. Real Properties</h3>
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>
            <div className="mt-2 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Kind</TableHead>
                    <TableHead>Exact Location</TableHead>
                    <TableHead>Assessed Value</TableHead>
                    <TableHead>Current Fair Market Value</TableHead>
                    <TableHead>Year Acquired</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead className="text-right">Acquisition Cost</TableHead>
                    <TableHead className="text-center">Owner</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {realProperties.map((prop, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{prop.description}</TableCell>
                      <TableCell>{prop.kind}</TableCell>
                      <TableCell className="max-w-50">{prop.exactLocation}</TableCell>
                      <TableCell>{prop.assessedValue}</TableCell>
                      <TableCell>{prop.currentFairMarketValue}</TableCell>
                      <TableCell>{prop.yearAcquired}</TableCell>
                      <TableCell>{prop.mode}</TableCell>
                      <TableCell className="text-right">{prop.acquisitionCost}</TableCell>
                      <TableCell className="text-center">{prop.owner}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setRealProperties(realProperties.filter((_, idx) => idx !== i))}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              * D = Declarant/s, SU = Exclusive prop. of spouse / Unmarried child below 18
            </p>
          </div>

          <Separator />

          {/* Personal Properties */}
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">b. Personal Properties</h3>
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>
            <div className="mt-2 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Year Acquired</TableHead>
                    <TableHead className="text-right">Acquisition Cost/Amount</TableHead>
                    <TableHead className="text-center">Owner</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personalProperties.map((prop, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{prop.description}</TableCell>
                      <TableCell>{prop.yearAcquired}</TableCell>
                      <TableCell className="text-right">{prop.acquisitionCostAmount}</TableCell>
                      <TableCell className="text-center">{prop.owner}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setPersonalProperties(personalProperties.filter((_, idx) => idx !== i))}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              * D = Declarant/s, SU = Exclusive prop. of spouse / Unmarried child below 18
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Liabilities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Liabilities</CardTitle>
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nature</TableHead>
                <TableHead>Name of Creditors</TableHead>
                <TableHead>Outstanding Balance</TableHead>
                <TableHead className="text-center">Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liabilities.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.nature}</TableCell>
                  <TableCell>{item.nameOfCreditors}</TableCell>
                  <TableCell>{item.outstandingBalance}</TableCell>
                  <TableCell className="text-center">{item.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-2 text-xs text-muted-foreground">
            * D = Declarant/s, SU = Spouse / unmarried child below 18
          </p>
        </CardContent>
      </Card>

      {/* Business Interests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Business Interests and Financial Connections</CardTitle>
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name of Entity/Business Enterprise</TableHead>
                <TableHead>Business Address</TableHead>
                <TableHead>Nature of Business Interest &amp;/or Financial Connection</TableHead>
                <TableHead>Date of Acquisition of Interest or Connection</TableHead>
                <TableHead className="text-center">Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {businessInterests.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.entityName}</TableCell>
                  <TableCell>{item.businessAddress}</TableCell>
                  <TableCell>{item.natureOfBusiness}</TableCell>
                  <TableCell>{item.dateOfAcquisition}</TableCell>
                  <TableCell className="text-center">{item.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-2 text-xs text-muted-foreground">
            * D = Declarant/s, SU = Spouse / unmarried child below 18
          </p>
        </CardContent>
      </Card>

      {/* Relatives in Government */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Relatives in the Government Service</CardTitle>
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name of Relative</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Name of Agency/Office and Address</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relativesInGovernment.map((rel, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{rel.name}</TableCell>
                  <TableCell>{rel.relationship}</TableCell>
                  <TableCell>{rel.position}</TableCell>
                  <TableCell>{rel.agencyAddress}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setRelativesInGovernment(relativesInGovernment.filter((_, idx) => idx !== i))}
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Signature */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Signature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div className="space-y-2">
              <Label>DOJ ID No.*</Label>
              <Input value={signatureData.dojIdNo} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>DOJ ID Date Issued*</Label>
              <Input value={signatureData.dojIdDateIssued} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Spouse Govt Issued ID</Label>
              <Input value={signatureData.spouseGovtIssuedId} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Spouse ID No.</Label>
              <Input value={signatureData.spouseIdNo} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Spouse ID Date Issued</Label>
              <Input value={signatureData.spouseDateIssued} readOnly className="bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
          onClick={handlePrint}
        >
          Print/Preview Full SALN
        </Button>
        <Button
          variant="outline"
          className="text-destructive border-destructive hover:bg-destructive/10"
          onClick={handleDeleteAll}
        >
          Delete All SALN Data
        </Button>
      </div>
    </div>
  )
}
