import Button from "@/components/ui/Button";
import { getLowestQuoteTotal } from "@/lib/mockData";

function formatEuro(amount) {
  return `€${amount.toLocaleString("de-DE")}`;
}

function getBestQuote(quotes) {
  if (!quotes.length) return null;
  return quotes.reduce((best, q) => (q.totalAmount < best.totalAmount ? q : best), quotes[0]);
}

function winnerColumnClass(isWinner) {
  if (!isWinner) return "";
  return "border-x-2 border-success/25 bg-success/[0.07]";
}

export default function QuoteComparisonTable({ items, quotes }) {
  const lowestTotal = getLowestQuoteTotal(quotes);
  const bestQuote = getBestQuote(quotes);

  if (!quotes.length) {
    return <p className="text-sm text-procurime-muted">Henüz teklif yok.</p>;
  }

  const sortedQuotes = [...quotes].sort((a, b) => {
    if (a.totalAmount === lowestTotal) return -1;
    if (b.totalAmount === lowestTotal) return 1;
    return a.totalAmount - b.totalAmount;
  });

  const secondBest = sortedQuotes.find((q) => q.totalAmount !== lowestTotal);
  const savings = secondBest ? secondBest.totalAmount - bestQuote.totalAmount : 0;

  const itemLabel = items[0]
    ? `${items[0].name} (${items[0].quantity} ${items[0].unit})`
    : "Kalem";

  const rows = [
    {
      key: "item",
      label: itemLabel,
      getValue: (q) => {
        const line = q.items[0];
        return line ? formatEuro(line.totalPrice) : "—";
      },
      isBest: (q) => {
        const min = Math.min(...quotes.map((x) => x.items[0]?.totalPrice ?? Infinity));
        return q.items[0]?.totalPrice === min;
      },
    },
    {
      key: "delivery",
      label: "Teslimat süresi",
      getValue: (q) => `${q.deliveryDays} gün`,
      isBest: (q) => q.deliveryDays === Math.min(...quotes.map((x) => x.deliveryDays)),
    },
    {
      key: "payment",
      label: "Ödeme vadesi",
      getValue: (q) => q.paymentTerms,
    },
    {
      key: "total",
      label: "Toplam",
      getValue: (q) => formatEuro(q.totalAmount),
      isTotal: true,
    },
  ];

  function isWinner(quote) {
    return quote.totalAmount === lowestTotal;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-success/30 bg-success/[0.06] px-3 py-3 sm:px-4">
        <p className="text-xs text-procurime-muted sm:text-sm">Önerilen teklif</p>
        <p className="mt-0.5 font-semibold text-procurime-text">{bestQuote.supplierName}</p>
        <p className="mt-1 text-xl font-bold text-success">{formatEuro(bestQuote.totalAmount)}</p>
        {savings > 0 && (
          <p className="mt-0.5 text-xs text-procurime-muted">
            Diğer tekliflere göre {formatEuro(savings)} daha düşük
          </p>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-procurime-border bg-white">
        <table className="w-full min-w-[560px] border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-procurime-border bg-procurime-bg">
              <th className="px-4 py-3 text-left font-medium text-procurime-muted" />
              {sortedQuotes.map((quote) => {
                const winner = isWinner(quote);
                return (
                  <th
                    key={quote.id}
                    className={`px-4 py-3.5 text-left ${winnerColumnClass(winner)}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          winner ? "bg-supplier" : "bg-supplier/60"
                        }`}
                      />
                      <span className={`font-semibold ${winner ? "text-procurime-text" : "text-procurime-sub"}`}>
                        {quote.supplierName}
                      </span>
                    </div>
                    {winner && (
                      <span className="mt-1.5 inline-block rounded bg-success px-1.5 py-0.5 text-[11px] font-medium text-white">
                        En iyi teklif
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isTotal = row.isTotal;
              return (
                <tr
                  key={row.key}
                  className={`border-b border-procurime-border ${
                    isTotal ? "border-t-2 border-t-procurime-border bg-procurime-bg/60" : ""
                  }`}
                >
                  <td
                    className={`px-4 py-3 font-medium text-procurime-muted ${
                      isTotal ? "font-semibold text-procurime-sub" : ""
                    }`}
                  >
                    {row.label}
                  </td>
                  {sortedQuotes.map((quote) => {
                    const winner = isWinner(quote);
                    const best = row.isBest?.(quote);

                    return (
                      <td
                        key={`${quote.id}-${row.key}`}
                        className={`px-4 py-3 ${winnerColumnClass(winner)} ${
                          isTotal && winner
                            ? "py-4 text-xl font-bold text-success"
                            : isTotal
                              ? "py-4 text-base font-semibold text-procurime-text"
                              : best
                                ? "font-semibold text-success"
                                : winner
                                  ? "text-procurime-text"
                                  : "text-procurime-sub"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {row.getValue(quote)}
                          {best && !isTotal && (
                            <span className="text-[10px] text-success">✓</span>
                          )}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr>
              <td className="px-4 py-4" />
              {sortedQuotes.map((quote) => {
                const winner = isWinner(quote);
                return (
                  <td
                    key={`action-${quote.id}`}
                    className={`px-4 py-4 ${winnerColumnClass(winner)}`}
                  >
                    <Button
                      size="sm"
                      variant={winner ? "primary" : "secondary"}
                      className={`w-full min-w-[120px] sm:max-w-[150px] ${winner ? "" : "opacity-70"}`}
                    >
                      Bu teklifi seç
                    </Button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
