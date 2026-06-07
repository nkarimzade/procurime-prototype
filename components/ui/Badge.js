import { RFQ_STATUS } from "@/lib/constants";

const colorMap = {
  gray: "bg-gray-100 text-gray-700",
  blue: "bg-buyer-light text-buyer",
  orange: "bg-supplier-light text-supplier",
  green: "bg-emerald-50 text-success",
};

export default function Badge({ status }) {
  const config = RFQ_STATUS[status] ?? { label: status, color: "gray" };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${colorMap[config.color]}`}
    >
      {config.label}
    </span>
  );
}
