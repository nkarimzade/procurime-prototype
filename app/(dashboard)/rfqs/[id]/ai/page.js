import { notFound } from "next/navigation";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Card from "@/components/ui/Card";
import ChatPanel from "@/components/ai/ChatPanel";
import { getRfqById } from "@/lib/mockData";

export default function RfqAiPage({ params }) {
  const rfq = getRfqById(params.id);
  if (!rfq) notFound();

  return (
    <>
      <DashboardHeader title="AI Asistan" />
      <main className="grid flex-1 gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-[280px_1fr]">
        <Card title="RFQ Özeti">
          <p className="text-sm font-medium text-procurime-text">{rfq.referenceNo}</p>
          <p className="mt-1 text-sm text-procurime-sub">{rfq.title}</p>
          <p className="mt-3 text-xs text-procurime-muted">{rfq.description}</p>
        </Card>
        <ChatPanel rfqTitle={rfq.title} />
      </main>
    </>
  );
}
