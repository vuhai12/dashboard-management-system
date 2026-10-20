"use client";

import { formatNumber } from "@/utils/numberUtils";
import { Pencil, Plus } from "lucide-react";

export default function WeeklyRevenueTable({ revenues, onEdit, onAdd }) {
  return (
    <>
      {/* Desktop table matching the supplied screenshot */}
      <div className="hidden overflow-x-auto rounded-[7px] border border-[#e4ebf8] md:block">
        <table className="w-full min-w-[1050px] table-auto border-collapse text-left">
          <thead className="bg-[#f4f7fc]">
            <tr className="h-[54px] text-[12px] font-semibold text-[#405783]">
              <th className="px-[11px]">Day</th>
              <th className="px-[11px]">Date</th>
              <th className="px-[11px]">POS Revenue ($)</th>
              <th className="px-[11px]">Eatclub Revenue ($)</th>
              <th className="px-[11px]">Labour Costs ($)</th>
              <th className="px-[11px]">Direct Revenue ($)</th>
              <th className="px-[11px]">Total Covers (people)</th>
              <th className="px-[11px]">Status</th>
              <th className="px-[11px] text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {revenues.map((revenue) => {
              return (
                <tr
                  key={revenue.date}
                  className="h-[61px] border-t border-[#edf1f8] text-[12px] hover:bg-[#fafcff]"
                >
                  <td className="whitespace-nowrap px-[11px] font-medium text-[#13264e]">
                    {revenue.dayOfWeek}
                  </td>
                  <td className="whitespace-nowrap px-[11px] text-[#30466f]">
                    {revenue.date}
                  </td>

                  <td className="whitespace-nowrap px-[11px] text-[#152a55]">
                    {revenue.hasData ? formatNumber(revenue.posRevenue) : "—"}
                  </td>
                  <td className="whitespace-nowrap px-[11px] text-[#152a55]">
                    {revenue.hasData
                      ? formatNumber(revenue.eatclubRevenue)
                      : "—"}
                  </td>
                  <td className="whitespace-nowrap px-[11px] text-[#152a55]">
                    {revenue.hasData ? formatNumber(revenue.labourCosts) : "—"}
                  </td>
                  <td className="whitespace-nowrap px-[11px] text-[#152a55]">
                    {revenue.hasData
                      ? formatNumber(revenue.directRevenue)
                      : "—"}
                  </td>
                  <td className="whitespace-nowrap px-[11px] text-[#152a55]">
                    {revenue.hasData ? formatNumber(revenue.totalCovers) : "—"}
                  </td>
                  <td className="px-[11px]">
                    {revenue?.hasData ? (
                      <span className="inline-flex min-w-[60px] justify-center rounded-full bg-[#d8f8e8] px-3 py-[6px] text-[11px] font-medium text-[#07844c]">
                        Filled
                      </span>
                    ) : (
                      <span className="inline-flex min-w-[73px] justify-center rounded-full bg-[#edf2fb] px-3 py-[6px] text-[11px] font-medium text-[#5d7198]">
                        No data
                      </span>
                    )}
                  </td>
                  <td className="px-[11px] text-center">
                    <button
                      onClick={() =>
                        revenue.hasData ? onEdit(revenue) : onAdd(revenue)
                      }
                      className={`inline-flex h-[34px] min-w-[82px] items-center justify-center gap-2 rounded-md px-3 text-[12px] font-medium transition ${
                        revenue?.hasData
                          ? "border border-[#b7ceff] bg-white text-[#155df5] hover:bg-blue-50"
                          : "bg-[#2862f5] text-white shadow-[0_2px_5px_rgba(40,98,245,.18)] hover:bg-blue-700"
                      }`}
                    >
                      {revenue?.hasData ? (
                        <>
                          <Pencil size={16} />
                          Edit
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          Add
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Responsive mobile list */}
      <div className="space-y-3 md:hidden">
        {revenues.map((revenue) => (
          <article
            key={revenue.date}
            className="overflow-hidden rounded-xl border border-[#e4ebf8] bg-white shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[#edf1f8] bg-[#f8faff] p-4">
              <div>
                <h2 className="text-sm font-semibold text-[#13264e]">
                  {revenue.dayOfWeek}
                </h2>
                <p className="mt-1 text-xs text-[#7182a3]">{revenue.date}</p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium ${
                  revenue.hasData
                    ? "bg-[#d8f8e8] text-[#07844c]"
                    : "bg-[#edf2fb] text-[#5d7198]"
                }`}
              >
                {revenue.hasData ? "Filled" : "No data"}
              </span>
            </div>

            {/* Revenue fields: 2 columns on mobile */}
            <div className="grid grid-cols-2 gap-3 p-4">
              <div className="rounded-lg bg-[#f8faff] p-3">
                <p className="text-[11px] text-[#7182a3]">POS Revenue</p>
                <p className="mt-1 break-words text-sm font-semibold text-[#152a55]">
                  {revenue.hasData ? formatNumber(revenue.posRevenue) : "—"}
                </p>
              </div>

              <div className="rounded-lg bg-[#f8faff] p-3">
                <p className="text-[11px] text-[#7182a3]">Eatclub Revenue</p>
                <p className="mt-1 break-words text-sm font-semibold text-[#152a55]">
                  {revenue.hasData ? formatNumber(revenue.eatclubRevenue) : "—"}
                </p>
              </div>

              <div className="rounded-lg bg-[#f8faff] p-3">
                <p className="text-[11px] text-[#7182a3]">Labour Costs</p>
                <p className="mt-1 break-words text-sm font-semibold text-[#152a55]">
                  {revenue.hasData ? formatNumber(revenue.labourCosts) : "—"}
                </p>
              </div>

              <div className="rounded-lg bg-[#f8faff] p-3">
                <p className="text-[11px] text-[#7182a3]">Direct Revenue</p>
                <p className="mt-1 break-words text-sm font-semibold text-[#152a55]">
                  {revenue.hasData ? formatNumber(revenue.directRevenue) : "—"}
                </p>
              </div>

              {/* Total Covers */}
              <div className="col-span-2 rounded-lg border border-[#e4ebf8] p-3">
                <p className="text-[11px] text-[#7182a3]">Total Covers</p>
                <p className="mt-1 text-sm font-semibold text-[#152a55]">
                  {revenue.hasData ? formatNumber(revenue.totalCovers) : "—"}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="px-4 pb-4">
              <button
                onClick={() =>
                  revenue.hasData ? onEdit(revenue) : onAdd(revenue)
                }
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-md text-sm font-medium transition ${
                  revenue.hasData
                    ? "border border-[#b7ceff] bg-white text-[#155df5] hover:bg-blue-50"
                    : "bg-[#2862f5] text-white hover:bg-blue-700"
                }`}
              >
                {revenue.hasData ? (
                  <>
                    <Pencil size={16} />
                    Edit
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add revenue
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
