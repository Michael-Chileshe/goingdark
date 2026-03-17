"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const update = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/client/portfolio";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0f1a] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
              KC
            </div>
            <span className="text-xl font-bold text-white">Kwacha Capital</span>
          </Link>
          <p className="mt-2 text-sm text-slate-500">Create your investment account</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Enter your full name"
                className="input"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className="input"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+260 9X XXX XXXX"
                className="input"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Min. 8 characters"
                className="input"
                required
                minLength={8}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                className="input"
                required
              />
            </div>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => update("agreeTerms", e.target.checked)}
                className="mt-1 rounded border-slate-700 bg-slate-800 text-teal-600 focus:ring-teal-500"
                required
              />
              <span className="text-xs text-slate-400">
                I agree to the Terms of Service, Privacy Policy, and Risk Disclosure.
                I understand that all investments carry risk and past performance does
                not guarantee future results.
              </span>
            </label>

            <button type="submit" className="btn-primary w-full">
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-slate-500">Already have an account? </span>
            <Link href="/auth/login" className="text-teal-400 hover:text-teal-300">
              Sign in
            </Link>
          </div>

          <div className="mt-4 rounded-lg bg-slate-800/50 p-3 text-center text-xs text-slate-500">
            Demo: Click &quot;Create Account&quot; to explore the investor dashboard
          </div>
        </div>
      </div>
    </div>
  );
}
