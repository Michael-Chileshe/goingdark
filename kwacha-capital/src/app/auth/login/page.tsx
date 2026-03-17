"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "admin">("client");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: redirect based on role
    if (role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/client/portfolio";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0f1a] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
              KC
            </div>
            <span className="text-xl font-bold text-white">Kwacha Capital</span>
          </Link>
          <p className="mt-2 text-sm text-slate-500">Sign in to your account</p>
        </div>

        <div className="card p-6">
          {/* Role Toggle */}
          <div className="mb-6 flex gap-1 rounded-lg bg-slate-900 p-1">
            {(["client", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  role === r ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {r === "client" ? "Investor" : "Admin"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Sign In as {role === "client" ? "Investor" : "Admin"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-slate-500">Don&apos;t have an account? </span>
            <Link href="/auth/register" className="text-teal-400 hover:text-teal-300">
              Sign up
            </Link>
          </div>

          {/* Demo hint */}
          <div className="mt-4 rounded-lg bg-slate-800/50 p-3 text-center text-xs text-slate-500">
            Demo: Enter any email/password and select role to explore the dashboard
          </div>
        </div>
      </div>
    </div>
  );
}
