"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/ui/AlertModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { mockCategories, mockSuppliers } from "@/lib/mockData";

const STEPS = ["Genel Bilgi", "Kalemler", "Tedarikçi Seç", "Özet & Gönder"];

const emptyItem = { name: "", quantity: "", unit: "adet", targetPrice: "" };

function validateStep(step, general, items, selectedSuppliers) {
  if (step === 0) {
    if (!general.title.trim()) return "RFQ başlığı zorunludur.";
    if (!general.categoryId) return "Kategori seçin.";
    if (!general.budget || Number(general.budget) <= 0) return "Geçerli bir bütçe girin.";
    if (!general.deadline) return "Son tarih seçin.";
  }
  if (step === 1) {
    const invalid = items.some(
      (item) => !item.name.trim() || !item.quantity || Number(item.quantity) <= 0
    );
    if (invalid) return "Her kalem için ürün adı ve geçerli miktar zorunludur.";
  }
  if (step === 2) {
    if (selectedSuppliers.length === 0) return "En az bir tedarikçi seçin.";
  }
  return null;
}

export default function RfqCreateForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState("");
  const [general, setGeneral] = useState({
    title: "",
    categoryId: "",
    budget: "",
    deadline: "",
    description: "",
  });
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const categoryName =
    mockCategories.find((c) => c.id === general.categoryId)?.name ?? "—";

  const selectedSupplierNames = mockSuppliers
    .filter((s) => selectedSuppliers.includes(s.id))
    .map((s) => s.name);

  function toggleSupplier(id) {
    setSelectedSuppliers((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function handleNext() {
    const error = validateStep(step, general, items, selectedSuppliers);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }

  function handleBack() {
    setStepError("");
    if (step > 0) setStep((s) => s - 1);
  }

  function handleSubmit() {
    const error = validateStep(2, general, items, selectedSuppliers);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError("");
    setShowSuccess(true);
  }

  function handleSuccessClose() {
    setShowSuccess(false);
    router.push("/rfqs");
  }

  return (
    <div className="space-y-6">
      <AlertModal
        open={showSuccess}
        title="RFQ gönderildi"
        message={
          general.title
            ? `"${general.title}" tedarikçilere iletildi.`
            : "Teklif talebiniz tedarikçilere iletildi."
        }
        hint="Mock prototip — kayıt listeye eklenmez."
        confirmLabel="RFQ listesine git"
        onConfirm={handleSuccessClose}
      />
      <div className="flex flex-wrap gap-2">
        {STEPS.map((label, index) => (
          <div
            key={label}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              index === step
                ? "bg-buyer text-white"
                : index < step
                  ? "bg-buyer-light text-buyer"
                  : "bg-procurime-bg text-procurime-muted"
            }`}
          >
            {index + 1}. {label}
          </div>
        ))}
      </div>

      {stepError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{stepError}</p>
      )}

      {step === 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="RFQ Başlığı"
            value={general.title}
            onChange={(e) => setGeneral({ ...general, title: e.target.value })}
          />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-procurime-sub">Kategori</label>
            <select
              value={general.categoryId}
              onChange={(e) => setGeneral({ ...general, categoryId: e.target.value })}
              className="w-full rounded-lg border border-procurime-border px-3 py-2 text-sm focus:border-buyer focus:outline-none"
            >
              <option value="">Seçin</option>
              {mockCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Bütçe Üst Limiti (EUR)"
            type="number"
            value={general.budget}
            onChange={(e) => setGeneral({ ...general, budget: e.target.value })}
          />
          <Input
            label="Son Tarih"
            type="date"
            value={general.deadline}
            onChange={(e) => setGeneral({ ...general, deadline: e.target.value })}
          />
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-procurime-sub">Açıklama</label>
            <textarea
              value={general.description}
              onChange={(e) => setGeneral({ ...general, description: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-procurime-border px-3 py-2 text-sm focus:border-buyer focus:outline-none"
            />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-lg border border-procurime-border p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-4"
            >
              <Input
                label="Ürün adı"
                value={item.name}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...next[index], name: e.target.value };
                  setItems(next);
                }}
              />
              <Input
                label="Miktar"
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...next[index], quantity: e.target.value };
                  setItems(next);
                }}
              />
              <Input
                label="Birim"
                value={item.unit}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...next[index], unit: e.target.value };
                  setItems(next);
                }}
              />
              <Input
                label="Hedef fiyat"
                type="number"
                value={item.targetPrice}
                onChange={(e) => {
                  const next = [...items];
                  next[index] = { ...next[index], targetPrice: e.target.value };
                  setItems(next);
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setItems([...items, { ...emptyItem }])}
          >
            Kalem Ekle
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-2 rounded-xl border border-procurime-border bg-white p-4">
          <p className="text-sm text-procurime-muted">
            Seçilen tedarikçi: {selectedSuppliers.length}
          </p>
          {mockSuppliers.map((supplier) => (
            <label
              key={supplier.id}
              className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 rounded-lg px-2 py-2 hover:bg-buyer-light"
            >
              <input
                type="checkbox"
                checked={selectedSuppliers.includes(supplier.id)}
                onChange={() => toggleSupplier(supplier.id)}
                className="accent-buyer"
              />
              <span className="text-sm text-procurime-text">{supplier.name}</span>
              <span className="w-full pl-7 text-xs text-procurime-muted sm:w-auto sm:pl-0">
                {supplier.category}
              </span>
            </label>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 rounded-xl border border-procurime-border bg-procurime-bg p-4 text-sm">
          <div>
            <h3 className="mb-2 font-semibold text-procurime-text">Genel Bilgi</h3>
            <p>
              <strong>Başlık:</strong> {general.title}
            </p>
            <p>
              <strong>Kategori:</strong> {categoryName}
            </p>
            <p>
              <strong>Bütçe:</strong> €{Number(general.budget).toLocaleString("de-DE")}
            </p>
            <p>
              <strong>Son tarih:</strong> {general.deadline}
            </p>
            {general.description && (
              <p>
                <strong>Açıklama:</strong> {general.description}
              </p>
            )}
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-procurime-text">Kalemler ({items.length})</h3>
            <ul className="space-y-1 text-procurime-sub">
              {items.map((item, index) => (
                <li key={index}>
                  {item.name} — {item.quantity} {item.unit}
                  {item.targetPrice ? ` · Hedef €${item.targetPrice}` : ""}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold text-procurime-text">
              Tedarikçiler ({selectedSuppliers.length})
            </h3>
            <p className="text-procurime-sub">{selectedSupplierNames.join(", ") || "—"}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={handleBack}
          disabled={step === 0}
          className="w-full sm:w-auto"
        >
          Geri
        </Button>
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={handleNext} className="w-full sm:w-auto">
            İleri
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} className="w-full sm:w-auto">
            Gönder
          </Button>
        )}
      </div>
    </div>
  );
}
