import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Building2,
  FileSpreadsheet,
  FolderKanban,
  Headset,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

type ApplicationItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

const applicationList: ApplicationItem[] = [
  { name: "Office App", url: "https://office.example.com", icon: Briefcase },
  { name: "HR Portal", url: "https://hr.example.com", icon: Building2 },
  { name: "Project Tracker", url: "https://projects.example.com", icon: FolderKanban },
  { name: "Knowledge Base", url: "https://kb.example.com", icon: FileSpreadsheet },
  { name: "Support Desk", url: "https://support.example.com", icon: Headset },
  { name: "Payroll System", url: "https://payroll.example.com", icon: WalletCards },
];

export function AppAccess() {
  return (
    <Card className="h-full border-slate-300 bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Application Access</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {applicationList.map((app) => (
            <li key={app.name} className="list-none">
              <a
                href={app.url}
                target="_blank"
                rel="noreferrer"
                className="block h-full rounded-md border border-slate-200 p-3 transition-colors hover:bg-slate-50"
              >
                <div className="flex min-h-24 flex-col items-center justify-center gap-2 text-center">
                  <app.icon className="h-7 w-7 text-slate-700 sm:h-8 sm:w-8" />
                  <p className="text-sm font-medium leading-tight text-slate-900">
                    {app.name}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
