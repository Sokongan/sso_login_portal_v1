import { Card, CardContent} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";

const forms = [
  {
    title: "2012 STATEMENT OF ASSETS, LIABILITIES & NET WORTH",
    description: "2012 Statement of Assets, Liabilities, and Net Worth (SALN) Form",
    link: "/forms/saln.pdf",
  },
  {
    title: "HDMF CALAMITY LOAN",
    description: "HDMF Calamity Loan",
    link: "/forms/calamity-loan.pdf",
  },
  {
    title: "HDMF MULTI PURPOSE LOAN",
    description: "HDMF Multi Purpose Loan",
    link: "/forms/multi-purpose-loan.pdf",
  },
  {
    title: "OSJEMPC APPLICATION FORM - APPLIANCE LOAN",
    description: "OSJEMPC Application Form - Appliance Loan",
    link: "/forms/appliance-loan.pdf",
  },
  {
    title: "OSJEMPC APPLICATION FORM - CAB",
    description: "OSJEMPC Application Form - Cash Advance Bonus",
    link: "/forms/cab.pdf",
  },
  {
    title: "OSJEMPC APPLICATION FORM - CALAMITY LOAN",
    description: "OSJEMPC Application Form - Calamity Loan",
    link: "/forms/osjempc-calamity-loan.pdf",
  },
  {
    title: "OSJEMPC APPLICATION FORM - SL MPL STL",
    description: "OSJEMPC Application Form - Salary, Multi-Purpose, Short Term Loan",
    link: "/forms/sl-mpl-stl.pdf",
  },
  {
    title: "OSJEMPC MANULIFE FORM",
    description: "OSJEMPC Manulife Form",
    link: "/forms/manulife.pdf",
  },
  {
    title: "OSJEMPC MEMBERSHIP APPLICATION",
    description: "OSJEMPC Membership",
    link: "/forms/membership.pdf",
  },
  {
    title: "PERSONAL DATA SHEET",
    description: "Personal Data Sheet",
    link: "/forms/personal-data-sheet.pdf",
  },
];

export function FormsPage() {
  return (
    <div className="w-full">
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forms.map((form) => (
                  <TableRow key={form.title}>
                    <TableCell>
                      <a
                        href={form.link}
                        download
                        className="hover:underline hover:text-blue-400 transition-all"
                      >
                        {form.title}
                      </a>
                    </TableCell>
                    <TableCell className="text-slate-700">
                      {form.description}
                    </TableCell>
                    <TableCell className="text-center">
                      <a
                        href={form.link}
                        download
                        className="inline-flex items-center justify-center p-2 ">
                        <Download className="w-5 h-5" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}