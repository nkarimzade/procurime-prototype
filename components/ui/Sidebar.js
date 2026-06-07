"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

function isActive(pathname, href) {
  if (href === "#") return false;
  if (href === "/dashboard") return pathname === "/dashboard";
  if (href.includes("/ai")) return pathname.includes("/ai");
  if (href === "/rfqs") {
    if (pathname.includes("/ai")) return false;
    return pathname === "/rfqs" || pathname.startsWith("/rfqs/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar({ open = false, onNavigate }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-56 shrink-0 flex-col border-r border-procurime-border bg-white transition-transform duration-200 ease-out lg:static lg:z-auto lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="hidden border-b border-procurime-border px-5 py-5 lg:block">
        <p className="text-lg font-bold text-admin">Procurime</p>
        <p className="text-xs text-procurime-muted">Buyer Panel</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3 pt-4 lg:pt-3">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const className = `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            item.disabled
              ? "cursor-not-allowed text-procurime-muted"
              : active
                ? "bg-buyer-light text-buyer"
                : "text-procurime-sub hover:bg-buyer-light hover:text-buyer"
          }`;

          if (item.disabled) {
            return (
              <span key={item.label} className={className}>
                {item.label}
              </span>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={className}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
