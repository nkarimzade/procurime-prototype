export const mockCategories = [
  { id: "cat-it", name: "BT / Donanım" },
  { id: "cat-office", name: "Ofis Malzemeleri" },
  { id: "cat-services", name: "Hizmet Alımı" },
];

export const mockSuppliers = [
  { id: "sup-a", name: "Supplier A", category: "BT / Donanım", score: 92, status: "active", lastQuoteAt: "2025-06-18" },
  { id: "sup-b", name: "Supplier B", category: "BT / Donanım", score: 88, status: "active", lastQuoteAt: "2025-06-19" },
  { id: "sup-c", name: "Supplier C", category: "BT / Donanım", score: 75, status: "active", lastQuoteAt: "2025-06-17" },
  { id: "sup-d", name: "Supplier D", category: "Ofis Malzemeleri", score: 81, status: "active", lastQuoteAt: "2025-06-10" },
  { id: "sup-e", name: "Supplier E", category: "Hizmet Alımı", score: 70, status: "passive", lastQuoteAt: "2025-05-22" },
  { id: "sup-f", name: "Supplier F", category: "BT / Donanım", score: 85, status: "active", lastQuoteAt: "2025-06-12" },
  { id: "sup-g", name: "Supplier G", category: "Ofis Malzemeleri", score: 79, status: "active", lastQuoteAt: "2025-06-08" },
  { id: "sup-h", name: "Supplier H", category: "Hizmet Alımı", score: 66, status: "passive", lastQuoteAt: "2025-04-30" },
];

export const mockRfqs = [
  {
    id: "rfq-001",
    referenceNo: "RFQ-2025-0047",
    title: "Ofis Laptop Alımı",
    status: "evaluating",
    categoryId: "cat-it",
    budget: 80000,
    currency: "EUR",
    deadline: "2025-07-15",
    quoteCount: 3,
    supplierCount: 5,
    createdAt: "2025-06-20",
    description: "100 adet iş istasyonu laptop tedariki.",
  },
  {
    id: "rfq-002",
    referenceNo: "RFQ-2025-0042",
    title: "Yıllık Ofis Kırtasiye",
    status: "sent",
    categoryId: "cat-office",
    budget: 12000,
    currency: "EUR",
    deadline: "2025-07-01",
    quoteCount: 1,
    supplierCount: 3,
    createdAt: "2025-06-15",
    description: "Merkez ofis için kırtasiye seti.",
  },
  {
    id: "rfq-003",
    referenceNo: "RFQ-2025-0038",
    title: "Bulut Altyapı Hizmeti",
    status: "draft",
    categoryId: "cat-services",
    budget: 45000,
    currency: "EUR",
    deadline: "2025-08-10",
    quoteCount: 0,
    supplierCount: 2,
    createdAt: "2025-06-10",
    description: "12 aylık IaaS kapasite artışı.",
  },
  {
    id: "rfq-004",
    referenceNo: "RFQ-2025-0031",
    title: "Güvenlik Kamerası Kurulumu",
    status: "awarded",
    categoryId: "cat-services",
    budget: 28000,
    currency: "EUR",
    deadline: "2025-06-01",
    quoteCount: 4,
    supplierCount: 4,
    createdAt: "2025-05-28",
    description: "Depo alanı kamera ve NVR kurulumu.",
  },
];

export const mockRfqItems = [
  {
    id: "item-001",
    rfqId: "rfq-001",
    name: "Laptop",
    quantity: 100,
    unit: "adet",
    targetPrice: 750,
  },
  {
    id: "item-002",
    rfqId: "rfq-002",
    name: "A4 Kağıt",
    quantity: 500,
    unit: "paket",
    targetPrice: 8,
  },
  {
    id: "item-003",
    rfqId: "rfq-002",
    name: "Tükenmez Kalem",
    quantity: 200,
    unit: "adet",
    targetPrice: 2,
  },
  {
    id: "item-004",
    rfqId: "rfq-004",
    name: "IP Kamera",
    quantity: 24,
    unit: "adet",
    targetPrice: 450,
  },
  {
    id: "item-005",
    rfqId: "rfq-004",
    name: "NVR Kayıt Cihazı",
    quantity: 2,
    unit: "adet",
    targetPrice: 1200,
  },
  {
    id: "item-006",
    rfqId: "rfq-004",
    name: "Kurulum Hizmeti",
    quantity: 1,
    unit: "paket",
    targetPrice: 3500,
  },
];

export const mockQuotes = [
  {
    id: "q-001",
    rfqId: "rfq-001",
    supplierId: "sup-a",
    supplierName: "Supplier A",
    totalAmount: 74900,
    deliveryDays: 10,
    paymentTerms: "Net 30",
    items: [{ rfqItemId: "item-001", unitPrice: 749, totalPrice: 74900 }],
  },
  {
    id: "q-002",
    rfqId: "rfq-001",
    supplierId: "sup-b",
    supplierName: "Supplier B",
    totalAmount: 71200,
    deliveryDays: 7,
    paymentTerms: "Net 45",
    items: [{ rfqItemId: "item-001", unitPrice: 712, totalPrice: 71200 }],
  },
  {
    id: "q-003",
    rfqId: "rfq-001",
    supplierId: "sup-c",
    supplierName: "Supplier C",
    totalAmount: 78500,
    deliveryDays: 14,
    paymentTerms: "Net 30",
    items: [{ rfqItemId: "item-001", unitPrice: 785, totalPrice: 78500 }],
  },
  {
    id: "q-004",
    rfqId: "rfq-002",
    supplierId: "sup-d",
    supplierName: "Supplier D",
    totalAmount: 9800,
    deliveryDays: 5,
    paymentTerms: "Net 30",
    items: [
      { rfqItemId: "item-002", unitPrice: 7.5, totalPrice: 3750 },
      { rfqItemId: "item-003", unitPrice: 1.9, totalPrice: 380 },
    ],
  },
  {
    id: "q-005",
    rfqId: "rfq-004",
    supplierId: "sup-e",
    supplierName: "Supplier E",
    totalAmount: 26500,
    deliveryDays: 12,
    paymentTerms: "Net 45",
    items: [
      { rfqItemId: "item-004", unitPrice: 480, totalPrice: 11520 },
      { rfqItemId: "item-005", unitPrice: 1350, totalPrice: 2700 },
      { rfqItemId: "item-006", unitPrice: 3800, totalPrice: 3800 },
    ],
  },
  {
    id: "q-006",
    rfqId: "rfq-004",
    supplierId: "sup-f",
    supplierName: "Supplier F",
    totalAmount: 24200,
    deliveryDays: 10,
    paymentTerms: "Net 30",
    items: [
      { rfqItemId: "item-004", unitPrice: 420, totalPrice: 10080 },
      { rfqItemId: "item-005", unitPrice: 1180, totalPrice: 2360 },
      { rfqItemId: "item-006", unitPrice: 3200, totalPrice: 3200 },
    ],
  },
  {
    id: "q-007",
    rfqId: "rfq-004",
    supplierId: "sup-h",
    supplierName: "Supplier H",
    totalAmount: 27800,
    deliveryDays: 15,
    paymentTerms: "Net 60",
    items: [
      { rfqItemId: "item-004", unitPrice: 510, totalPrice: 12240 },
      { rfqItemId: "item-005", unitPrice: 1400, totalPrice: 2800 },
      { rfqItemId: "item-006", unitPrice: 4100, totalPrice: 4100 },
    ],
  },
  {
    id: "q-008",
    rfqId: "rfq-004",
    supplierId: "sup-g",
    supplierName: "Supplier G",
    totalAmount: 25100,
    deliveryDays: 8,
    paymentTerms: "Net 30",
    items: [
      { rfqItemId: "item-004", unitPrice: 445, totalPrice: 10680 },
      { rfqItemId: "item-005", unitPrice: 1250, totalPrice: 2500 },
      { rfqItemId: "item-006", unitPrice: 3400, totalPrice: 3400 },
    ],
  },
];

export const mockActivities = [
  { id: "act-1", text: "RFQ-2025-0047 gönderildi", time: "2 saat önce" },
  { id: "act-2", text: "Supplier A teklif verdi", time: "5 saat önce" },
  { id: "act-3", text: "RFQ-2025-0042 onay bekliyor", time: "1 gün önce" },
  { id: "act-4", text: "Supplier B teklif verdi", time: "1 gün önce" },
];

export const mockDashboardMetrics = {
  activeRfqs: 3,
  pendingQuotes: 5,
  pendingApprovals: 2,
  monthlySpend: 142500,
};

export function getRfqById(id) {
  return mockRfqs.find((rfq) => rfq.id === id) ?? null;
}

export function getRfqItemsByRfqId(rfqId) {
  return mockRfqItems.filter((item) => item.rfqId === rfqId);
}

export function getQuotesByRfqId(rfqId) {
  return mockQuotes.filter((quote) => quote.rfqId === rfqId);
}

export function getCategoryById(id) {
  return mockCategories.find((cat) => cat.id === id) ?? null;
}

export function getLowestQuoteTotal(quotes) {
  if (!quotes.length) return null;
  return Math.min(...quotes.map((q) => q.totalAmount));
}
