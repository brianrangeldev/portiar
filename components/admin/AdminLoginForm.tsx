"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Não foi possível entrar.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-light px-5 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-brand-orange">
          Painel PortiAr
        </span>
        <h1 className="section-title mt-2 text-2xl">Entrar</h1>

        <label className="mt-6 block text-sm font-semibold text-navy">
          Utilizador
          <input
            type="text"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            autoComplete="username"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base text-slate-800 focus:border-brand-blue focus:outline-none"
          />
        </label>

        <label className="mt-4 block text-sm font-semibold text-navy">
          Palavra-passe
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base text-slate-800 focus:border-brand-blue focus:outline-none"
          />
        </label>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-6 flex w-full items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "A entrar..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
