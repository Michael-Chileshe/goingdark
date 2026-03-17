import Link from "next/link";

const strategies = [
  {
    name: "Value Investing",
    desc: "Buy undervalued LUSE stocks using fundamental analysis for long-term appreciation.",
    risk: "Low Risk",
    target: "12% / yr",
  },
  {
    name: "Dividend Yield",
    desc: "Invest in high-dividend Zambian companies for consistent income.",
    risk: "Low Risk",
    target: "10% / yr",
  },
  {
    name: "Momentum Trading",
    desc: "Capture price trends using technical indicators with strict risk controls.",
    risk: "Medium Risk",
    target: "15% / yr",
  },
  {
    name: "Mean Reversion",
    desc: "Buy oversold stocks that deviate from historical averages.",
    risk: "Medium-Low Risk",
    target: "11% / yr",
  },
  {
    name: "Risk Parity",
    desc: "Balance portfolio volatility across sectors for stable, consistent returns.",
    risk: "Low Risk",
    target: "10% / yr",
  },
];

const stats = [
  { label: "Assets Under Management", value: "K2.45M+" },
  { label: "Active Investors", value: "147" },
  { label: "Average Annual Return", value: "13.8%" },
  { label: "Win Rate", value: "78.5%" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
              KC
            </div>
            <span className="text-lg font-bold text-white">Kwacha Capital</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm text-slate-400 transition-colors hover:text-white">
              Sign In
            </Link>
            <Link href="/auth/register" className="btn-primary text-sm">
              Start Investing
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-600/5 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 text-center">
          <div className="mb-4 inline-flex rounded-full border border-teal-500/30 bg-teal-600/10 px-4 py-1.5 text-xs font-medium text-teal-400">
            Now open to all Zambian investors
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Grow Your Wealth with{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Quantitative Trading
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Kwacha Capital uses systematic, data-driven strategies to trade the Lusaka Stock Exchange.
            Targeting stable <span className="text-white font-semibold">10-15% annual returns</span> with
            institutional-grade risk management.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/auth/register" className="btn-primary px-8 py-3 text-base">
              Start Investing Today
            </Link>
            <Link href="/client/positions" className="btn-secondary px-8 py-3 text-base">
              View Positions
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-600">
            Minimum investment: K1,000 &middot; Bank, Mobile Money & Crypto accepted
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800/50 bg-slate-900/30">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">How It Works</h2>
          <p className="mt-2 text-slate-500">Three simple steps to start growing your wealth</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Create Account",
              desc: "Sign up in minutes. Complete KYC verification for security.",
            },
            {
              step: "02",
              title: "Fund Your Account",
              desc: "Deposit via bank transfer, mobile money (Airtel, MTN, Zamtel), or cryptocurrency.",
            },
            {
              step: "03",
              title: "Watch It Grow",
              desc: "Our algorithms trade LUSE stocks systematically. Track every position and its reasoning.",
            },
          ].map((item) => (
            <div key={item.step} className="card p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600/20 text-sm font-bold text-teal-400">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategies */}
      <section className="border-t border-slate-800/50 bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Our Strategies</h2>
            <p className="mt-2 text-slate-500">Five proven low-risk strategies working together for stable returns</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {strategies.map((s) => (
              <div key={s.name} className="card-hover p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full border border-teal-500/30 bg-teal-600/10 px-2.5 py-0.5 text-[10px] font-medium text-teal-400">
                    {s.risk}
                  </span>
                  <span className="text-sm font-bold text-emerald-400">{s.target}</span>
                </div>
                <h3 className="text-base font-semibold text-white">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </div>
            ))}
            {/* CTA card */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 p-5 text-center">
              <p className="text-sm text-slate-500">All strategies combined target</p>
              <p className="mt-1 text-3xl font-bold text-teal-400">10-15%</p>
              <p className="text-sm text-slate-500">annual returns</p>
              <Link href="/auth/register" className="btn-primary mt-4 text-xs">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Deposit Your Way</h2>
          <p className="mt-2 text-slate-500">Multiple payment methods for all Zambians</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600/20 text-2xl">
              <svg className="h-7 w-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h3 className="text-base font-semibold text-white">Bank Transfer</h3>
            <p className="mt-2 text-sm text-slate-400">ZANACO, FNB, Stanbic, Standard Chartered, and more</p>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600/20 text-2xl">
              <svg className="h-7 w-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-base font-semibold text-white">Mobile Money</h3>
            <p className="mt-2 text-sm text-slate-400">Airtel Money, MTN MoMo, Zamtel Kwacha</p>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600/20 text-2xl">
              <svg className="h-7 w-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-base font-semibold text-white">Cryptocurrency</h3>
            <p className="mt-2 text-sm text-slate-400">USDT (TRC-20), Bitcoin, auto-converted to ZMW</p>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="border-t border-slate-800/50 bg-slate-900/20">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white">Full Transparency</h2>
              <p className="mt-4 text-slate-400 leading-relaxed">
                We believe you should know exactly where your money is invested and why.
                Every single position taken by our fund is visible to all investors, complete
                with the reasoning behind each trade.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "See every open and closed position in real-time",
                  "Read the analysis behind each investment decision",
                  "Track your portfolio performance with detailed charts",
                  "Full visibility into strategy allocation and risk levels",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/client/positions" className="btn-primary mt-6 inline-flex">
                View Current Positions
              </Link>
            </div>
            <div className="card p-5">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Sample Position</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">ZCCM</p>
                    <p className="text-xs text-slate-500">ZCCM Investments Holdings</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">+13.41%</span>
                </div>
                <div className="rounded-lg bg-slate-800/50 p-3 text-xs leading-relaxed text-slate-400">
                  &ldquo;ZCCM is trading below intrinsic value based on DCF analysis. With copper prices
                  stabilizing above $8,500/ton and Zambia&apos;s mining sector reforms, the stock offers
                  strong upside. P/E ratio of 6.2x vs sector average of 9.8x.&rdquo;
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="rounded bg-teal-600/20 px-2 py-0.5 text-teal-400">Value Investing</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-400">Mining</span>
                  <span className="rounded bg-emerald-600/20 px-2 py-0.5 text-emerald-400">Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white">Ready to Start Investing?</h2>
        <p className="mx-auto mt-4 max-w-lg text-slate-400">
          Join 147+ Zambian investors already growing their wealth with Kwacha Capital.
          Start with as little as K1,000.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/auth/register" className="btn-primary px-8 py-3 text-base">
            Create Free Account
          </Link>
          <Link href="/auth/login" className="btn-secondary px-8 py-3 text-base">
            Sign In
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-slate-950/50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-xs font-bold text-white">KC</div>
                <span className="font-bold text-white">Kwacha Capital</span>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Zambia&apos;s premier quantitative investment fund, making institutional-grade trading accessible to everyone.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Platform</p>
              <ul className="mt-3 space-y-2">
                <li><Link href="/client/portfolio" className="text-sm text-slate-400 hover:text-white">Portfolio</Link></li>
                <li><Link href="/client/positions" className="text-sm text-slate-400 hover:text-white">Positions</Link></li>
                <li><Link href="/client/invest" className="text-sm text-slate-400 hover:text-white">Invest</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Company</p>
              <ul className="mt-3 space-y-2">
                <li><span className="text-sm text-slate-400">About Us</span></li>
                <li><span className="text-sm text-slate-400">Contact</span></li>
                <li><span className="text-sm text-slate-400">Careers</span></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Legal</p>
              <ul className="mt-3 space-y-2">
                <li><span className="text-sm text-slate-400">Terms of Service</span></li>
                <li><span className="text-sm text-slate-400">Privacy Policy</span></li>
                <li><span className="text-sm text-slate-400">Risk Disclosure</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
            <p>&copy; 2026 Kwacha Capital Ltd. All rights reserved.</p>
            <p className="mt-1">Licensed by Securities and Exchange Commission, Zambia. Past performance does not guarantee future results.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
