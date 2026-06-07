"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { isAuthenticated, setAuthenticated, validateLogin } from "@/lib/auth";
import { DEMO_USER } from "@/lib/constants";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [router]);

  function handleSubmit(e) {
    e.preventDefault();
    const result = validateLogin(email, password);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    setAuthenticated(true);
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <Input
        label="E-posta"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="demo@procurime.com"
      />
      <Input
        label="Şifre"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-danger">{error}</p>
      )}
      <Button type="submit" className="w-full" size="lg">
        Giriş Yap
      </Button>
      <p className="text-center text-xs text-procurime-muted">
        Geçerli e-posta + en az 3 karakter şifre ile giriş yapılır.
        <br />
        Örnek: {DEMO_USER.email} / {DEMO_USER.password}
      </p>
    </form>
  );
}
