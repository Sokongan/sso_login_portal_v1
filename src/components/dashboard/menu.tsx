
import type { DashboardMenuItem } from "@/types/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Mail, Folder, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge } from "../ui/badge";

const menuCards: DashboardMenuItem[] = [
    {
        menu: "Email",
        url: "/email",
        icon: Mail,
    },
    {
        menu: "Directory",
        url: "/directory",
        icon: Folder,
    },
    {
        menu: "Forms",
        url: "/forms",
        icon: FileText,
    },
];


export function DashboardMenu() {
    return (
        <Card className="h-full border-slate-300 bg-white shadow-sm">
            <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {menuCards.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink key={item.menu} to={item.url} className="block">
                                    <Badge
                                        variant="secondary"
                                        className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 px-3 py-2 text-center text-sm hover:bg-slate-200"
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span className="truncate">{item.menu}</span>
                                    </Badge>
                                </NavLink>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Card className="md:col-span-1">
                            <CardContent className="flex h-full min-h-28 flex-col items-center justify-center gap-1 p-4 text-center">
                                <h3 className="text-lg font-semibold">Time</h3>
                                <p className="text-sm text-slate-600">Date</p>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2">
                            <div className="flex h-full flex-col sm:flex-row">
                                <div className="flex flex-1 flex-col justify-center p-4">
                                    <CardHeader className="px-0 pb-2 text-center text-lg sm:text-left">
                                        <CardTitle>Know Your Colleague</CardTitle>
                                    </CardHeader>

                                    <CardDescription className="text-center text-sm text-slate-600 sm:text-left">
                                        <p>Name:</p>
                                        <p>Birthday:</p>
                                        <p>Office:</p>
                                    </CardDescription>
                                </div>

                                <div className="flex flex-1 items-center justify-center p-4">
                                    <img
                                        src="/thumbs.jpeg"
                                        alt="Event cover"
                                        className="max-h-40 w-full max-w-xs object-contain sm:max-h-44"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
