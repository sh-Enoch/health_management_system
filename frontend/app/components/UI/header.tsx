import { Bell, Search, User2 } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-between gap-6 rounded-[28px] border border-white/60 bg-white/70 px-5 py-4 shadow-[0_18px_45px_rgba(16,42,34,0.08)] backdrop-blur-sm md:px-7">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <span className="text-lg font-bold">H</span>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700/80">
            health dashboard
          </p>
          <h1 className="text-xl font-semibold text-slate-900">HealthSasa</h1>
        </div>
      </div>

      <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
        <button className="transition hover:text-emerald-700">Overview</button>
        <button className="transition hover:text-emerald-700">Clients</button>
        <button className="transition hover:text-emerald-700">Programs</button>
        <button className="transition hover:text-emerald-700">Goals</button>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700">
          <Search className="h-4 w-4" />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700">
          <Bell className="h-4 w-4" />
        </button>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/20">
          <User2 className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}

export default Header;
