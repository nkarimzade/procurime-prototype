const variants = {
  primary:
    "bg-buyer text-white hover:bg-buyer-hover disabled:opacity-50",
  secondary:
    "bg-white text-buyer border border-procurime-border hover:bg-buyer-light",
  ghost: "bg-transparent text-procurime-sub hover:bg-buyer-light",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
