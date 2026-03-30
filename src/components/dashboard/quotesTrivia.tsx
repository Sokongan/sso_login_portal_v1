import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";

export function QuotesTrivia() {
  const quote = {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  };

  const trivia = "Honey never spoils. Archaeologists found edible honey in ancient tombs.";

  return (
    <Card className="border-slate-300 bg-white shadow-sm">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-sm">Quotes & Trivia</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4 sm:p-6">
        <section className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <p className="text-sm text-slate-900">"{quote.text}"</p>
          <p className="mt-2 text-xs font-medium text-slate-600">- {quote.author}</p>
        </section>

        <section className="rounded-md border border-slate-200 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Trivia
          </p>
          <p className="mt-1 text-sm text-slate-900">{trivia}</p>
        </section>
        <Separator/>
          <a
          href="/"
          className="mt-2 inline-block text-xs font-medium text-slate-600 underline underline-offset-2 hover:text-slate-900"
        >
          Software for your PC
        </a>
      </CardContent>
    </Card>
  );
}
