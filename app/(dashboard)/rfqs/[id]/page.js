import { notFound } from "next/navigation";
import Link from "next/link";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import RfqDetailTabs from "@/components/rfq/RfqDetailTabs";
import {
  getCategoryById,
  getQuotesByRfqId,
  getRfqById,
  getRfqItemsByRfqId,
} from "@/lib/mockData";

export default function RfqDetailPage({ params }) {
  const rfq = getRfqById(params.id);
  if (!rfq) notFound();

  const items = getRfqItemsByRfqId(rfq.id);
  const quotes = getQuotesByRfqId(rfq.id);
  const category = getCategoryById(rfq.categoryId);

  return (
    <>
      <DashboardHeader title={rfq.referenceNo} />
      <main className="flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-procurime-text">{rfq.title}</h2>
              <p className="mt-1 text-sm text-procurime-muted">{category?.name}</p>
            </div>
            <Badge status={rfq.status} />
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <p>
              <span className="text-procurime-muted">Son tarih:</span> {rfq.deadline}
            </p>
            <p>
              <span className="text-procurime-muted">Kalem:</span> {items.length}
            </p>
            <p>
              <span className="text-procurime-muted">Teklif:</span> {quotes.length}
            </p>
            <p>
              <span className="text-procurime-muted">Tedarikçi:</span> {rfq.supplierCount}
            </p>
          </div>
          <div className="mt-4">
            <Link href={`/rfqs/${rfq.id}/ai`} className="text-sm text-buyer hover:text-buyer-hover hover:underline">
              AI Asistan →
            </Link>
          </div>
        </Card>

        <Card title="RFQ Detayı">
          <RfqDetailTabs rfq={rfq} items={items} quotes={quotes} />
        </Card>
      </main>
    </>
  );
}
