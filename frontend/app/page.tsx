import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Header from "@/app/components/UI/header";

const highlights = [
  "Personalized daily check-ins",
  "Clear progress, without the clutter",
  "One calm place for your care plan",
];

function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      <main className="py-8 md:py-12">
        <section className="relative overflow-hidden rounded-[34px] bg-slate-950 px-6 py-10 text-white shadow-[0_30px_70px_rgba(16,42,34,0.22)] md:px-12 md:py-14 lg:px-16">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-teal-400/15 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                HealthSasa
              </div>

              <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
                Manage your Teams health
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                Create and manage health programs, create and add clients to the
                health programs
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Open my dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* <div className="relative mx-auto w-full max-w-sm rounded-[28px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    Wellness score
                  </p>
                  <p className="mt-2 text-5xl font-semibold">87</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                  <HeartPulse className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[87%] rounded-full bg-emerald-400" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Great momentum</span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <TrendingUp className="h-3.5 w-3.5" /> +12%
                </span>
              </div>

              <div className="mt-7 border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold">Today is a good day</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Your routine is 3 days strong
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* <section className="grid gap-8 px-2 py-10 md:grid-cols-[0.8fr_1.2fr] md:px-6 md:py-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Built for consistency
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              A clearer view of what helps you feel well.
            </h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-emerald-100 bg-white/70 p-4 shadow-[0_12px_30px_rgba(16,42,34,0.04)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-4 w-4" />
                </div>
                <p className="mt-4 text-sm font-semibold leading-5 text-slate-800">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </section> */}
      </main>
    </div>
  );
}

export default Home;
