export default function Card({ children, className = "", title, action }) {
  return (
    <div
      className={`rounded-xl border border-procurime-border bg-white p-5 shadow-sm ${className}`}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title ? <h3 className="text-sm font-semibold text-procurime-text">{title}</h3> : <span />}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
