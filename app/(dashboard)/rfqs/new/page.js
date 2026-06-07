import DashboardHeader from "@/components/layout/DashboardHeader";
import RfqCreateForm from "@/components/rfq/RfqCreateForm";

export default function NewRfqPage() {
  return (
    <>
      <DashboardHeader title="Yeni RFQ Oluştur" />
      <main className="flex-1 p-4 sm:p-6">
        <RfqCreateForm />
      </main>
    </>
  );
}
