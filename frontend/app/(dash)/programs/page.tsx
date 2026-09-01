"use client";
import React, { useState } from "react";
import { PlusIcon, X, LoaderIcon } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Program } from "@/app/utils/types/types";
import useSWR, { mutate } from "swr";

type FormData = {
  name: string;
  description: string;
};

const fetcher = async (url: string): Promise<Program[]> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const text = await response.text();
  if (!text) return [];

  const data = JSON.parse(text);
  if (!Array.isArray(data)) {
    throw new Error("Unexpected response format");
  }

  return data;
};

function ProgramsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { data, error, isLoading } = useSWR<Program[]>(
    "/api/v1/programs",
    fetcher,
  );

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setSubmitError("");

    try {
      const response = await fetch("/api/v1/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Something went wrong creating a program");
      }

      reset();
      setIsOpen(false);
      await mutate("/api/v1/programs");
    } catch (submitFailure) {
      setSubmitError(
        submitFailure instanceof Error
          ? submitFailure.message
          : "Something went wrong creating a program",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <LoaderIcon className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Failed to load programs. Please try again.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="mx-auto w-fit rounded-xl bg-white px-4 py-2 text-black">
          <h1 className="text-xl font-semibold leading-tight tracking-wide">
            All Programs
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((program) => (
          <div
            key={program.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <h3 className="font-semibold text-slate-900">{program.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{program.description}</p>
          </div>
        ))}
      </div>

      {data?.length === 0 && (
        <div className="py-12 text-center text-slate-500">
          No programs yet. Click the + button to add one.
        </div>
      )}

      <button
        type="button"
        className="fixed bottom-12 right-12 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:bg-emerald-50 hover:shadow-xl active:scale-95"
        aria-label="Add new program"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">
                Add new program
              </h2>
              <button
                type="button"
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close add program form"
                onClick={() => {
                  reset();
                  setSubmitError("");
                  setIsOpen(false);
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Program name
                  <input
                    type="text"
                    placeholder="Enter program name"
                    {...register("name", {
                      required: "Program name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                  />
                </label>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Description
                  <textarea
                    placeholder="Enter program description"
                    rows={4}
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white"
                  />
                </label>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {submitError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setSubmitError("");
                    setIsOpen(false);
                  }}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                >
                  {isSubmitting ? "Creating..." : "Save program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProgramsPage;
