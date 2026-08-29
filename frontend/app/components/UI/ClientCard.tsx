import React from "react";
import { User } from "@/app/utils/types/types";
import { CalendarDays, Phone, User2, VenusAndMars } from "lucide-react";

interface ClientCardProps {
  user: User;
}

function ClientCard({ user }: ClientCardProps) {
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <User2 className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-700">
            IAM #{user.id}
          </p>
          <h2 className="mt-1 truncate text-xl font-semibold text-slate-900">
            {fullName}
          </h2>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
          <div>
            <dt className="text-xs text-slate-400">Phone</dt>
            <dd className="font-medium text-slate-800">{user.phone_number}</dd>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <CalendarDays className="h-4 w-4 shrink-0 text-emerald-600" />
          <div>
            <dt className="text-xs text-slate-400">Date of birth</dt>
            <dd className="font-medium text-slate-800">{user.date_of_birth}</dd>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <VenusAndMars className="h-4 w-4 shrink-0 text-emerald-600" />
          <div>
            <dt className="text-xs text-slate-400">Gender</dt>
            <dd className="font-medium capitalize text-slate-800">
              {user.gender}
            </dd>
          </div>
        </div>
      </dl>
    </article>
  );
}

export default ClientCard;
