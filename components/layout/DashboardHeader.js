"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { setAuthenticated } from "@/lib/auth";

export default function DashboardHeader({ title }) {
  const router = useRouter();

  function handleLogout() {
    setAuthenticated(false);
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between gap-3 border-b border-procurime-border bg-white px-4 py-3 sm:px-6 sm:py-4">
      <h1 className="truncate text-base font-semibold text-procurime-text sm:text-lg">{title}</h1>
      <Button variant="ghost" size="sm" onClick={handleLogout}>
        Çıkış
      </Button>
    </header>
  );
}
