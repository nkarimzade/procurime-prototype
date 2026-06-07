import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-procurime-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-admin">Procurime</h1>
          <p className="mt-1 text-sm text-procurime-muted">Buyer Panel</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
