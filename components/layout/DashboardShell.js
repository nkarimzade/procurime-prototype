"use client";

import { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";

export default function DashboardShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-procurime-text/30 lg:hidden"
          aria-label="Menüyü kapat"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center gap-3 border-b border-procurime-border bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg p-2 text-procurime-sub hover:bg-buyer-light"
          aria-label="Menüyü aç"
          aria-expanded={menuOpen}
        >
          <span className="block text-lg leading-none">☰</span>
        </button>
        <div>
          <p className="text-sm font-bold leading-tight text-admin">Procurime</p>
          <p className="text-[10px] text-procurime-muted">Buyer Panel</p>
        </div>
      </header>

      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col pt-14 lg:pt-0">{children}</div>
    </div>
  );
}
