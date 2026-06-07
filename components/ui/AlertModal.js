import Button from "@/components/ui/Button";

export default function AlertModal({
  open,
  title,
  message,
  hint,
  confirmLabel = "Tamam",
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-procurime-text/30"
        aria-label="Kapat"
        onClick={onConfirm}
      />
      <div className="relative mx-4 w-full max-w-sm rounded-xl border border-procurime-border bg-white p-5 shadow-lg sm:p-6">
        <div className="flex gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
            ✓
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="alert-title" className="font-semibold text-procurime-text">
              {title}
            </h2>
            {message && (
              <p className="mt-1.5 text-sm text-procurime-sub">{message}</p>
            )}
            {hint && (
              <p className="mt-2 text-xs text-procurime-muted">{hint}</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
