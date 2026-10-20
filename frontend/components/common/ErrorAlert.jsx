"use client";

import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

export default function ErrorAlert({ message, onClose, onRetry }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      className="fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-lg border border-red-200 bg-white p-4 shadow-lg"
    >
      <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-500" />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-800">
          Something went wrong
        </p>

        <p className="mt-1 break-words text-sm text-slate-600">{message}</p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Try again
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        aria-label="Close error message"
      >
        <X size={16} />
      </button>
    </div>
  );
}
