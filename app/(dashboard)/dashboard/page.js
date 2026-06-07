import Link from "next/link";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { mockActivities, mockDashboardMetrics } from "@/lib/mockData";

const metrics = [
  { label: "Aktif RFQ", value: mockDashboardMetrics.activeRfqs },
  { label: "Bekleyen Teklif", value: mockDashboardMetrics.pendingQuotes },
  { label: "Bekleyen Onay", value: mockDashboardMetrics.pendingApprovals },
  {
    label: "Bu Ay Harcama",
    value: `€${mockDashboardMetrics.monthlySpend.toLocaleString("de-DE")}`,
  },
];

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-procurime-muted">Satın alma özeti</p>
          <Link href="/rfqs/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Yeni RFQ Oluştur</Button>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <p className="text-xs text-procurime-muted">{metric.label}</p>
              <p className="mt-2 text-2xl font-bold text-procurime-text">{metric.value}</p>
            </Card>
          ))}
        </div>

        <Card title="Son Aktivite">
          <ul className="space-y-3">
            {mockActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex flex-col gap-1 border-b border-procurime-border pb-3 text-sm last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-procurime-text">{activity.text}</span>
                <span className="shrink-0 text-procurime-muted">{activity.time}</span>
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </>
  );
}
