"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { revenueSchema } from "@/schemas/revenueSchema";

const fields = [
  { key: "posRevenue", label: "POS Revenue", unit: "$" },
  { key: "eatclubRevenue", label: "Eatclub Revenue", unit: "$" },
  { key: "labourCosts", label: "Labour Costs", unit: "$" },
  { key: "directRevenue", label: "Direct Revenue", unit: "$" },
  { key: "totalCovers", label: "Total Covers", unit: "people" },
];

const blankForm = {
  posRevenue: "",
  eatclubRevenue: "",
  labourCosts: "",
  directRevenue: "",
  totalCovers: "",
};

export default function RevenueForm({ setIsOpenForm, initialData, onSubmit }) {
  const isEdit = initialData?.hasData === true;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(revenueSchema),
    defaultValues: blankForm,
  });

  // Reset the form whenever the selected revenue record changes.
  useEffect(() => {
    if (isEdit) {
      reset({
        posRevenue: String(initialData.posRevenue ?? ""),
        eatclubRevenue: String(initialData.eatclubRevenue ?? ""),
        labourCosts: String(initialData.labourCosts ?? ""),
        directRevenue: String(initialData.directRevenue ?? ""),
        totalCovers: String(initialData.totalCovers ?? ""),
      });
    } else {
      reset(blankForm);
    }
  }, [initialData, isEdit, reset]);

  const handleFormSubmit = async (data) => {
    // Convert input strings to numbers before submitting the data.
    const payload = {
      posRevenue: Number(data.posRevenue),
      eatclubRevenue: Number(data.eatclubRevenue),
      labourCosts: Number(data.labourCosts),
      directRevenue: Number(data.directRevenue),
      totalCovers: Number(data.totalCovers),
    };

    // Skip the API request if no values have changed.
    if (isEdit) {
      const changedFields = {};

      Object.keys(payload).forEach((key) => {
        if (Number(initialData[key]) !== payload[key]) {
          changedFields[key] = payload[key];
        }
      });

      // Skip the API request if no values have changed.
      if (Object.keys(changedFields).length === 0) {
        setIsOpenForm(false);
        return;
      }

      await onSubmit(changedFields);
      return;
    }

    if (onSubmit) {
      await onSubmit(payload);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        // Close the modal when the user clicks outside the form.
        if (event.target === event.currentTarget) {
          setIsOpenForm(false);
        }
      }}
    >
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl sm:p-6">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEdit ? "Edit Revenue" : "Add Revenue"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsOpenForm(false)}
            className="rounded-lg px-2 text-2xl leading-none text-slate-400 hover:bg-slate-100"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map(({ key, label, unit }) => (
              <div
                key={key}
                className={key === "totalCovers" ? "sm:col-span-2" : ""}
              >
                <label
                  htmlFor={key}
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  {label} <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    id={key}
                    type="number"
                    min="0"
                    step={key === "totalCovers" ? "1" : "any"}
                    {...register(key)}
                    placeholder="Enter value"
                    aria-invalid={Boolean(errors[key])}
                    className={`w-full rounded-lg border px-3 py-2.5 pr-16 text-sm outline-none focus:ring-2 ${
                      errors[key]
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />

                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-400">
                    {unit}
                  </span>
                </div>

                {/* Display the validation error for the current field. */}
                {errors[key] && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[key].message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsOpenForm(false)}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-[#2862f5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
