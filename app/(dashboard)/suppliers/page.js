"use client";

import { useState, useMemo } from "react";
import DashboardHeader from "@/components/layout/DashboardHeader";
import Card from "@/components/ui/Card";
import { mockSuppliers, mockCategories } from "@/lib/mockData";

function scoreColor(score) {
  if (score >= 85) return "text-success font-semibold";
  if (score >= 70) return "text-supplier font-medium";
  return "text-danger";
}

function statusBadge(status) {
  if (status === "active") return "bg-success/10 text-success";
  return "bg-gray-100 text-gray-500";
}

function SupplierCard({ supplier }) {
  return (
    <div className="rounded-xl border border-procurime-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-supplier-light text-sm font-bold text-supplier">
            {supplier.name.charAt(supplier.name.length - 1)}
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-procurime-text">{supplier.name}</p>
            <p className="text-xs text-procurime-muted">{supplier.category}</p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(supplier.status)}`}
        >
          {supplier.status === "active" ? "Aktif" : "Pasif"}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-procurime-muted">Skor (0–100)</p>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-2 w-20 overflow-hidden rounded-full bg-gray-100 sm:w-24">
              <div
                className={`h-full rounded-full ${
                  supplier.score >= 85
                    ? "bg-success"
                    : supplier.score >= 70
                      ? "bg-supplier"
                      : "bg-danger"
                }`}
                style={{ width: `${supplier.score}%` }}
              />
            </div>
            <span className={`text-sm ${scoreColor(supplier.score)}`}>{supplier.score}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-procurime-muted">Son teklif</p>
          <p className="mt-1 text-sm text-procurime-sub">{supplier.lastQuoteAt}</p>
        </div>
      </div>
    </div>
  );
}

function SupplierTable({ suppliers }) {
  if (!suppliers.length) {
    return (
      <p className="px-3 py-8 text-center text-sm text-procurime-muted">
        Eşleşen tedarikçi bulunamadı.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-xs sm:min-w-[600px] sm:text-sm">
        <thead className="border-b border-procurime-border bg-procurime-bg">
          <tr>
            <th className="px-3 py-2.5 font-medium text-procurime-sub">Tedarikçi</th>
            <th className="px-3 py-2.5 font-medium text-procurime-sub">Kategori</th>
            <th className="px-3 py-2.5 font-medium text-procurime-sub">Skor</th>
            <th className="px-3 py-2.5 font-medium text-procurime-sub">Durum</th>
            <th className="px-3 py-2.5 font-medium text-procurime-sub">Son teklif</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="border-b border-procurime-border transition-colors hover:bg-supplier-light/30"
            >
              <td className="px-3 py-3 font-medium">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-supplier" />
                  {supplier.name}
                </span>
              </td>
              <td className="px-3 py-3 text-procurime-sub">{supplier.category}</td>
              <td className={`px-3 py-3 ${scoreColor(supplier.score)}`}>{supplier.score}</td>
              <td className="px-3 py-3">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge(supplier.status)}`}
                >
                  {supplier.status === "active" ? "Aktif" : "Pasif"}
                </span>
              </td>
              <td className="px-3 py-3 text-procurime-sub">{supplier.lastQuoteAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SuppliersPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");

  const filtered = useMemo(() => {
    return mockSuppliers.filter((s) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!s.name.toLowerCase().includes(q)) return false;
      }
      if (categoryFilter !== "all" && s.category !== categoryFilter) return false;
      return true;
    });
  }, [search, categoryFilter]);

  const hasFilters = search.trim() !== "" || categoryFilter !== "all";

  function clearFilters() {
    setSearch("");
    setCategoryFilter("all");
  }

  return (
    <>
      <DashboardHeader title="Tedarikçiler" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <input
            type="search"
            placeholder="Tedarikçi adı ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-procurime-border px-3 py-2 text-sm focus:border-buyer focus:outline-none sm:max-w-xs"
          />
          <div className="w-full sm:w-auto">
            <label className="mb-1 block text-xs font-medium text-procurime-muted">Kategori</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-lg border border-procurime-border px-3 py-2 text-sm focus:border-buyer focus:outline-none sm:w-auto"
            >
              <option value="all">Tüm kategoriler</option>
              {mockCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-danger hover:underline sm:pb-2"
            >
              Filtreleri temizle
            </button>
          )}

          <div className="flex rounded-lg border border-procurime-border sm:ml-auto">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors sm:flex-none ${
                viewMode === "table"
                  ? "bg-buyer text-white"
                  : "bg-white text-procurime-sub hover:bg-buyer-light"
              } rounded-l-lg`}
            >
              Tablo
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors sm:flex-none ${
                viewMode === "card"
                  ? "bg-buyer text-white"
                  : "bg-white text-procurime-sub hover:bg-buyer-light"
              } rounded-r-lg`}
            >
              Kart
            </button>
          </div>
        </div>

        <p className="mb-3 text-xs text-procurime-muted">
          {filtered.length} tedarikçi
          {hasFilters ? ` (toplam ${mockSuppliers.length})` : ""}
          <span className="mx-1.5 text-procurime-border">·</span>
          {viewMode === "table" ? "Tablo görünümü" : "Kart görünümü"}
        </p>

        {viewMode === "table" ? (
          <Card>
            <SupplierTable suppliers={filtered} />
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {filtered.length === 0 ? (
              <p className="col-span-full rounded-xl border border-procurime-border bg-white py-8 text-center text-sm text-procurime-muted">
                Eşleşen tedarikçi bulunamadı.
              </p>
            ) : (
              filtered.map((supplier) => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))
            )}
          </div>
        )}
      </main>
    </>
  );
}
