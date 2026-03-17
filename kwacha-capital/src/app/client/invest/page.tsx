"use client";

import { useState } from "react";
import { paymentMethods } from "@/data/mock";
import { cn } from "@/lib/utils";

type Step = "amount" | "method" | "confirm" | "success";

export default function InvestPage() {
  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [methodType, setMethodType] = useState<"bank" | "mobile-money" | "crypto">("bank");

  const methods = paymentMethods.filter((m) => m.type === methodType);
  const selectedPayment = paymentMethods.find((m) => m.id === selectedMethod);

  const presetAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

  const handleSubmit = () => {
    setStep("success");
  };

  const reset = () => {
    setStep("amount");
    setAmount("");
    setSelectedMethod("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Invest</h1>
        <p className="text-sm text-slate-500">Add funds to your Kwacha Capital portfolio</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {(["amount", "method", "confirm", "success"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                step === s
                  ? "bg-teal-600 text-white"
                  : (["amount", "method", "confirm", "success"].indexOf(step) > i)
                    ? "bg-teal-600/20 text-teal-400"
                    : "bg-slate-800 text-slate-500"
              )}
            >
              {i + 1}
            </div>
            {i < 3 && <div className="h-0.5 w-8 bg-slate-800 sm:w-16" />}
          </div>
        ))}
      </div>

      {/* Step 1: Amount */}
      {step === "amount" && (
        <div className="card animate-fade-in p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">How much would you like to invest?</h2>

          <div className="mb-4">
            <label className="mb-2 block text-xs text-slate-500">Amount (ZMW)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-500">K</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="input pl-10 text-2xl font-bold"
              />
            </div>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-2">
            {presetAmounts.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a.toString())}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  amount === a.toString()
                    ? "border-teal-500 bg-teal-600/20 text-teal-400"
                    : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
                )}
              >
                K{a.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="rounded-lg bg-slate-800/50 p-4 text-sm">
            <p className="text-slate-400">
              Minimum investment: <span className="text-white">K1,000</span>
            </p>
            <p className="mt-1 text-slate-400">
              Expected annual return: <span className="text-emerald-400">10-15%</span>
            </p>
            <p className="mt-1 text-slate-400">
              Lock period: <span className="text-white">30 days</span>
            </p>
          </div>

          <button
            onClick={() => setStep("method")}
            disabled={!amount || parseFloat(amount) < 1000}
            className="btn-primary mt-4 w-full"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Payment Method */}
      {step === "method" && (
        <div className="card animate-fade-in p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Choose Payment Method</h2>

          {/* Method Type Tabs */}
          <div className="mb-4 flex gap-1 rounded-lg bg-slate-900 p-1">
            {([
              { key: "bank", label: "Bank Transfer" },
              { key: "mobile-money", label: "Mobile Money" },
              { key: "crypto", label: "Crypto" },
            ] as const).map((t) => (
              <button
                key={t.key}
                onClick={() => { setMethodType(t.key); setSelectedMethod(""); }}
                className={cn(
                  "flex-1 rounded-md px-3 py-2 text-xs font-medium transition-colors",
                  methodType === t.key ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors",
                  selectedMethod === m.id
                    ? "border-teal-500 bg-teal-600/10"
                    : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                )}
              >
                <span className="text-2xl">{m.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{m.name}</p>
                  <p className="text-xs text-slate-500">{m.details}</p>
                </div>
                {selectedMethod === m.id && (
                  <svg className="ml-auto h-5 w-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {methodType === "crypto" && (
            <div className="mt-4 rounded-lg border border-cyan-800/30 bg-cyan-900/10 p-3 text-xs text-cyan-400">
              Crypto deposits are converted to ZMW at the current market rate upon confirmation.
            </div>
          )}

          <div className="mt-4 flex gap-3">
            <button onClick={() => setStep("amount")} className="btn-secondary flex-1">Back</button>
            <button
              onClick={() => setStep("confirm")}
              disabled={!selectedMethod}
              className="btn-primary flex-1"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === "confirm" && (
        <div className="card animate-fade-in p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Confirm Investment</h2>

          <div className="space-y-3 rounded-lg bg-slate-800/50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Investment Amount</span>
              <span className="font-bold text-white">K{parseFloat(amount || "0").toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Payment Method</span>
              <span className="text-white">{selectedPayment?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Method Type</span>
              <span className="rounded bg-slate-700 px-2 py-0.5 text-xs text-slate-300">{methodType}</span>
            </div>
            <hr className="border-slate-700" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Management Fee (2%/yr)</span>
              <span className="text-slate-300">K{(parseFloat(amount || "0") * 0.02).toFixed(2)}/yr</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Lock Period</span>
              <span className="text-slate-300">30 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Expected Return (12.5% avg)</span>
              <span className="text-emerald-400">K{(parseFloat(amount || "0") * 0.125).toFixed(2)}/yr</span>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-amber-800/30 bg-amber-900/10 p-3 text-xs text-amber-400">
            By confirming, you agree to the investment terms. Past performance does not guarantee future results. All investments carry risk.
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={() => setStep("method")} className="btn-secondary flex-1">Back</button>
            <button onClick={handleSubmit} className="btn-primary flex-1">
              Confirm Investment
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === "success" && (
        <div className="card animate-fade-in p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600/20">
            <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white">Investment Submitted!</h2>
          <p className="mt-2 text-sm text-slate-400">
            Your investment of <span className="font-bold text-white">K{parseFloat(amount || "0").toLocaleString()}</span> via{" "}
            <span className="text-white">{selectedPayment?.name}</span> has been submitted.
          </p>

          {methodType === "bank" && (
            <div className="mx-auto mt-4 max-w-sm rounded-lg bg-slate-800/50 p-4 text-left text-sm">
              <p className="mb-2 text-xs font-medium uppercase text-slate-500">Bank Transfer Details</p>
              <p className="text-slate-300">Account: <span className="text-white">Kwacha Capital Ltd</span></p>
              <p className="text-slate-300">Bank: <span className="text-white">{selectedPayment?.name}</span></p>
              <p className="text-slate-300">Account #: <span className="font-mono text-white">0100-2345-6789</span></p>
              <p className="text-slate-300">Branch: <span className="text-white">Lusaka Main</span></p>
              <p className="mt-2 text-xs text-amber-400">Use your reference number in the transfer narration.</p>
            </div>
          )}

          {methodType === "mobile-money" && (
            <div className="mx-auto mt-4 max-w-sm rounded-lg bg-slate-800/50 p-4 text-left text-sm">
              <p className="mb-2 text-xs font-medium uppercase text-slate-500">Mobile Money Details</p>
              <p className="text-slate-300">Send to: <span className="font-mono text-white">+260 97 123 4567</span></p>
              <p className="text-slate-300">Name: <span className="text-white">Kwacha Capital Ltd</span></p>
              <p className="mt-2 text-xs text-amber-400">Include your reference number in the message.</p>
            </div>
          )}

          {methodType === "crypto" && (
            <div className="mx-auto mt-4 max-w-sm rounded-lg bg-slate-800/50 p-4 text-left text-sm">
              <p className="mb-2 text-xs font-medium uppercase text-slate-500">Crypto Wallet Address</p>
              <p className="break-all font-mono text-xs text-white">TRx7fH8kN2mQ4...wP9vL3jY6bC1</p>
              <p className="mt-2 text-xs text-amber-400">Only send the specified token on the correct network.</p>
            </div>
          )}

          <p className="mt-4 text-xs text-slate-500">
            Reference: <span className="font-mono text-slate-400">INV-{Date.now().toString(36).toUpperCase()}</span>
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <button onClick={reset} className="btn-primary">Make Another Investment</button>
            <a href="/client/portfolio" className="btn-secondary">View Portfolio</a>
          </div>
        </div>
      )}
    </div>
  );
}
