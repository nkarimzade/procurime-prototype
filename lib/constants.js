export const DEMO_USER = {
  email: "demo@procurime.com",
  password: "demo123",
};

export const AUTH_STORAGE_KEY = "procurime-auth";

export const RFQ_STATUS = {
  draft: { label: "Taslak", color: "gray" },
  sent: { label: "Gönderildi", color: "blue" },       // buyer turkuaz
  evaluating: { label: "Değerlendiriliyor", color: "orange" }, // supplier turuncu
  awarded: { label: "Tamamlandı", color: "green" },     // success yeşil
};

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/rfqs", label: "RFQ'lar" },
  { href: "/suppliers", label: "Tedarikçiler" },
  { href: "/rfqs/rfq-001/ai", label: "AI Asistan" },
];
