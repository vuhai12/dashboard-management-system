import { z } from "zod";

export const revenueSchema = z.object({
  posRevenue: z
    .string()
    .min(1, "POS Revenue is required")
    .refine((value) => value.trim() !== "" && Number.isFinite(Number(value)), {
      message: "Please enter a valid number",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Value cannot be negative",
    }),

  eatclubRevenue: z
    .string()
    .min(1, "Eatclub Revenue is required")
    .refine((value) => value.trim() !== "" && Number.isFinite(Number(value)), {
      message: "Please enter a valid number",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Value cannot be negative",
    }),

  labourCosts: z
    .string()
    .min(1, "Labour Costs is required")
    .refine((value) => value.trim() !== "" && Number.isFinite(Number(value)), {
      message: "Please enter a valid number",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Value cannot be negative",
    }),

  directRevenue: z
    .string()
    .min(1, "Direct Revenue is required")
    .refine((value) => value.trim() !== "" && Number.isFinite(Number(value)), {
      message: "Please enter a valid number",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Value cannot be negative",
    }),

  totalCovers: z
    .string()
    .min(1, "Total Covers is required")
    .refine((value) => value.trim() !== "" && Number.isFinite(Number(value)), {
      message: "Please enter a valid number",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Value cannot be negative",
    })
    .refine((value) => Number.isInteger(Number(value)), {
      message: "Total Covers must be a whole number",
    }),
});
