"use client";
import React, { FormEvent, useState } from "react";
import ClientCard from "@/app/components/UI/ClientCard";
import useSWR, { mutate } from "swr";
import { User } from "@/app/utils/types/types";
import { PlusIcon, X } from "lucide-react";

const emptyForm = {
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  phone_number: "",
};

function ClientsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetcher = (url: string) =>
    fetch(url).then((response) => response.json());

  const { data } = useSWR<User[]>("/api/v1/clients", fetcher);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/v1/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Unable to create the client.");
      }

      setFormData(emptyForm);
      setIsOpen(false);
      await mutate("/api/v1/clients");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create the client.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div className="mx-auto w-fit rounded-xl bg-white px-4 py-2 text-black">
          <h1 className="text-xl font-semibold leading-tight tracking-wide">
            All Clients
          </h1>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 px-8 md:grid-cols-2 lg:grid-cols-2">
          {data &&
            data.map((user: User) => (
              <div key={user.id}>
                <ClientCard user={user} />
              </div>
            ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                Add new client
              </h2>
              <button
                type="button"
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close add client form"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  First name
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="Jane"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Last name
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="Doe"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Date of birth
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Gender
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                    required
                  >
                    <option value="">Select</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700">
                Phone number
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                  placeholder="(555) 123-4567"
                  required
                />
              </label>

              {error && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {error}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                >
                  {isSubmitting ? "Saving..." : "Save client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button
        className="fixed bottom-12 right-12 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-950 text-white shadow-lg transition hover:bg-emerald-50 hover:shadow-xl active:scale-95"
        aria-label="Add new client"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    </>
  );
}

export default ClientsPage;
