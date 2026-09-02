"use client";
import React, { useState } from "react";
import useSWR from "swr";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
};

import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Droplets,
  HeartPulse,
  Sparkles,
} from "lucide-react";
const statCards = [
  {
    label: "Heart rate",
    value: "72 bpm",
    change: "+4.2%",
    accent: "bg-rose-50 text-rose-600",
    icon: HeartPulse,
  },
  {
    label: "Hydration",
    value: "1.8 L",
    change: "+1.1 L",
    accent: "bg-sky-50 text-sky-600",
    icon: Droplets,
  },
  {
    label: "Sleep",
    value: "7.8 hrs",
    change: "+0.5 hrs",
    accent: "bg-violet-50 text-violet-600",
    icon: Activity,
  },
];

const quickActions = ["Log workout", "Meal plan", "Check-in", "Water goal"];

const appointments = [
  { day: "Mon", title: "Cardio checkup", time: "09:30 AM" },
  { day: "Wed", title: "Nutrition session", time: "02:00 PM" },
  { day: "Fri", title: "Wellness review", time: "11:15 AM" },
];

function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8">
      <main className="mt-8 space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-[30px] border border-emerald-100 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 p-7 text-white shadow-[0_30px_60px_rgba(13,96,80,0.3)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-100">
                  wellness score
                </p>
                <h2 className="mt-3 text-4xl font-bold">87%</h2>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                <Sparkles className="h-7 w-7" />
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm text-emerald-50/90">
              You are on track this week. Recovery and hydration remain your
              strongest patterns.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="rounded-full bg-white/12 px-3 py-1 text-sm font-medium text-emerald-50">
                +12% vs last week
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                View insights
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Today</h3>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                Active
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {quickActions.map((action) => (
                <button
                  key={action}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {action}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {statCards.map(({ label, value, change, accent, icon: Icon }) => (
            <div
              key={label}
              className="rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-emerald-600">
                  {change}
                </span>
              </div>

              <div className="mt-6">
                <p className="text-sm text-slate-500">{label}</p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {value}
                </h3>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">
                Weekly progress
              </h3>
              <button className="text-sm font-medium text-emerald-700">
                This week
              </button>
            </div>

            <div className="mt-6 flex h-44 items-end gap-3">
              {[48, 68, 58, 82, 72, 94, 88].map((height, index) => (
                <div
                  key={index}
                  className="flex flex-1 flex-col items-center gap-3"
                >
                  <div
                    className="w-full rounded-t-[18px] bg-gradient-to-t from-emerald-600 to-emerald-300"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs font-medium text-slate-500">
                    {"MTWTFSS"[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">Upcoming</h3>
              <CalendarDays className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="mt-6 space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.title}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                      {appointment.day}
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {appointment.title}
                    </p>
                  </div>
                  <span className="text-sm text-slate-500">
                    {appointment.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
