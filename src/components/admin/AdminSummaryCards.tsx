import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type AdminSummaryCardsProps = {
  total: number;
  admins: number;
  active: number;
};

export default function AdminSummaryCards({ total, admins, active }: AdminSummaryCardsProps) {
  const cards = [
    { label: 'Total users', value: total },
    { label: 'Admin users', value: admins },
    { label: 'Active users', value: active },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label} className="bg-white/90 dark:bg-slate-900/80">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {card.value}
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
