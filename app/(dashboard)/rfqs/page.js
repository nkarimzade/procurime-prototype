"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockRfqs } from "@/lib/mockData";
import { RFQ_STATUS } from "@/lib/constants";

export default function RfqsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filtered = useMemo(() => {
    return mockRfqs.filter((rfq) => {
      // Arama filtresi
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = rfq.title.toLowerCase().includes(q);
        const matchesRef = rfq.referenceNo.toLowerCase().includes(q);
        if (!matchesTitle && !matchesRef) return false;
      }

      // Durum filtresi
      if (statusFilter !== "all" && rfq.status !== statusFilter) return false;

      // Tarih aralığı filtresi
      if (dateFrom && rfq.deadline < dateFrom) return false;
      if (dateTo && rfq.deadline > dateTo) return false;

      return true;
    });
  }, [search, statusFilter, dateFrom, dateTo]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
  }

  const hasActiveFilters = search || statusFilter !== "all" || dateFrom || dateTo;

  return (
    <>
      <DashboardHeader title="RFQ'lar" />
      <main className="flex-1 p-4 sm:p-6">
        {/* Üst bar — Arama + Yeni RFQ */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <input
            type="search"
            placeholder="RFQ adı veya numarası ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm rounded-lg border border-procurime-border px-3 py-2 text-sm focus:border-buyer focus:outline-none"
          />
          <Link href="/rfqs/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">Yeni RFQ</Button>
          </Link>
        </div>

        {/* Filtreler */}
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-procurime-muted">Durum</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-procurime-border px-3 py-2 text-sm focus:border-buyer focus:outline-none"
            >
              <option value="all">Tümü</option>
              {Object.entries(RFQ_STATUS).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-procurime-muted">Başlangıç</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-lg border border-procurime-border px-3 py-2 text-sm focus:border-buyer focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-procurime-muted">Bitiş</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-lg border border-procurime-border px-3 py-2 text-sm focus:border-buyer focus:outline-none"
            />
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg px-3 py-2 text-sm text-danger hover:bg-red-50 transition-colors"
            >
              Filtreleri Temizle
            </button>
          )}
        </div>

        {/* Sonuç sayısı */}
        <p className="mb-2 text-xs text-procurime-muted">
          {filtered.length} RFQ gösteriliyor
          {hasActiveFilters ? ` (toplam ${mockRfqs.length})` : ""}
        </p>

        {/* Mobil kartlar */}
        <div className="space-y-3 md:hidden">
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-procurime-border bg-white px-4 py-8 text-center text-sm text-procurime-muted">
              Eşleşen RFQ bulunamadı.
            </p>
          ) : (
            filtered.map((rfq) => (
              <button
                key={rfq.id}
                type="button"
                onClick={() => router.push(`/rfqs/${rfq.id}`)}
                className="w-full rounded-xl border border-procurime-border bg-white p-4 text-left transition-colors hover:bg-buyer-light/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-procurime-muted">{rfq.referenceNo}</p>
                    <p className="mt-1 font-medium text-procurime-text">{rfq.title}</p>
                  </div>
                  <Badge status={rfq.status} />
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-procurime-sub">
                  <span>{rfq.quoteCount} teklif</span>
                  <span>Son tarih: {rfq.deadline}</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Tablo — tablet ve üzeri */}
        <div className="hidden overflow-x-auto rounded-xl border border-procurime-border bg-white md:block">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-procurime-border bg-procurime-bg">
              <tr>
                <th className="px-4 py-3 font-medium text-procurime-sub">RFQ No</th>
                <th className="px-4 py-3 font-medium text-procurime-sub">Başlık</th>
                <th className="px-4 py-3 font-medium text-procurime-sub">Durum</th>
                <th className="px-4 py-3 font-medium text-procurime-sub">Teklif</th>
                <th className="px-4 py-3 font-medium text-procurime-sub">Son Tarih</th>
                <th className="px-4 py-3 font-medium text-procurime-sub">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-procurime-muted">
                    Eşleşen RFQ bulunamadı.
                  </td>
                </tr>
              ) : (
                filtered.map((rfq) => (
                  <tr
                    key={rfq.id}
                    onClick={() => router.push(`/rfqs/${rfq.id}`)}
                    className="cursor-pointer border-b border-procurime-border transition-colors hover:bg-buyer-light/40"
                  >
                    <td className="px-4 py-3 font-medium">{rfq.referenceNo}</td>
                    <td className="px-4 py-3">{rfq.title}</td>
                    <td className="px-4 py-3">
                      <Badge status={rfq.status} />
                    </td>
                    <td className="px-4 py-3">{rfq.quoteCount}</td>
                    <td className="px-4 py-3">{rfq.deadline}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/rfqs/${rfq.id}`}
                        className="text-buyer hover:text-buyer-hover hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Detay
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
