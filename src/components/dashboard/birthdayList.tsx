import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const birthdayNames = ["John Doe", "Jane Doe", "John Doe", "Jane Doe", "John Doe", "Jane Doe"];
const BIRTHDAY_LIMIT = 4;

export function BirthdayList() {
  const limitedNames = birthdayNames.slice(0, BIRTHDAY_LIMIT);
  const hiddenCount = Math.max(0, birthdayNames.length - BIRTHDAY_LIMIT);

  return (
    <Card className="h-fit border-slate-300 bg-white shadow-sm">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm">Birthday List</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <ul className="space-y-1.5">
          {limitedNames.map((name, index) => (
            <li
              key={`${name}-${index}`}
              className="text-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-900"
            >
              <span
                className={
                  index === limitedNames.length - 1
                    ? "cursor-pointer transition-colors hover:text-slate-700 hover:underline"
                    : ""
                }
                title={index === limitedNames.length - 1 ? "Last name in the list" : undefined}
              >
                {name}
              </span>
            </li>
          ))}
        </ul>
        {hiddenCount > 0 ? <p className="mt-2 text-xs text-slate-500">+{hiddenCount} more</p> : null}
        <a
          href="/birthdays"
          className="mt-2 inline-block text-xs font-medium text-slate-600 underline underline-offset-2 hover:text-slate-900"
        >
          More information
        </a>
      </CardContent>
    </Card>
  );
}
