"use client";
import React, { useState } from "react";
import { PlusIcon, X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

import useSwr from "swr";

type FormData = {
  name: string;
  description: string;
};

function ProgramsPage() {
  const [isOpen, setIsOpen] = useState(false);

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

  const fetcher = (url: string) => fetch(url).then((resp) => resp.json);
  const { isLoading, isValidating, data } = useSwr("", fetcher);


  
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form submitted:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="mx-auto w-fit rounded-xl bg-white px-4 py-2 text-black">
          <h1 className="text-xl font-semibold leading-tight tracking-wide">
            All Programs
          </h1>
        </div>
      </div>

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

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    reset();
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
