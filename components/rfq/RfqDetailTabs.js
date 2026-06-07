"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import QuoteComparisonTable from "@/components/rfq/QuoteComparisonTable";

export default function RfqDetailTabs({ rfq, items, quotes }) {
  const [tab, setTab] = useState(quotes.length > 0 ? "quotes" : "items");
  const tabs = [
    { id: "items", label: "Kalemler" },
    { id: "quotes", label: "Teklifler" },
    { id: "ai", label: "AI Analiz" },
  ];

  return (
    <div>
      <div className="-mx-1 mb-4 flex gap-1 overflow-x-auto border-b border-procurime-border px-1 pb-px sm:flex-wrap sm:gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "border-buyer text-buyer"
                : "border-transparent text-procurime-muted hover:text-procurime-sub"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "items" && (
        <ul className="space-y-2 text-sm">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between rounded-lg border border-procurime-border px-4 py-3"
            >
              <span>
                {item.name} — {item.quantity} {item.unit}
              </span>
              <span className="text-procurime-muted">Hedef: €{item.targetPrice}</span>
            </li>
          ))}
        </ul>
      )}

      {tab === "quotes" && <QuoteComparisonTable items={items} quotes={quotes} />}

      {tab === "ai" && (
        <div className="rounded-lg border border-procurime-border bg-buyer-light p-4">
          <p className="mb-3 text-sm text-procurime-sub">
            AI asistan bu RFQ için teklif analizi ve müzakere önerileri sunar.
          </p>
          <Link href={`/rfqs/${rfq.id}/ai`}>
            <Button>AI Asistanı Aç</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
