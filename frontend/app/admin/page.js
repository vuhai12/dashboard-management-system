"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toISODate } from "../../utils/dateUtils";
import RevenueForm from "@/components/RevenueManagement/RevenueForm";
import {
  createRevenue,
  getWeeklyRevenues,
  updateRevenue,
} from "@/services/revenueService";
import AuthGuard from "@/components/auth/AuthGuard";
import { Sidebar } from "@/components/common/Sidebar";
import { RevenueManagement } from "@/components/RevenueManagement/RevenueManagement";
import { logoutApi } from "@/services/authService";

export default function RevenueManagementPage() {
  const [selectedDate, setSelectedDate] = useState(() => toISODate(new Date()));
  const [revenues, setRevenues] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedRevenue, setSelectedRevenue] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchRevenues = useCallback(async () => {
    setIsLoading(true);
    setFetchError("");
    try {
      const result = await getWeeklyRevenues(selectedDate);
      setRevenues(result.data);
    } catch (error) {
      console.error("Failed to fetch revenues:", error);
      setFetchError(
        error.response?.data?.message ||
          "Failed to load revenue data. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchRevenues();
  }, [fetchRevenues]);

  const onEdit = (revenue) => {
    setSelectedRevenue(revenue);
    setIsOpenForm(true);
    setErrorMessage("");
  };

  const onAdd = (revenue) => {
    setSelectedRevenue(revenue);
    setIsOpenForm(true);
    setErrorMessage("");
  };

  const handleSaveRevenue = async (data) => {
    try {
      if (selectedRevenue?.hasData) {
        await updateRevenue(selectedRevenue.id, data);
      } else {
        await createRevenue({
          ...data,
          date: selectedRevenue.date,
        });
      }

      setIsOpenForm(false);
      await fetchRevenues();
    } catch (error) {
      console.error("Failed to save revenue:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      router.replace("/login");
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f7f9fd] text-[#10234f]">
        <div className="flex min-h-screen">
          <Sidebar onLogout={handleLogout} />
          <RevenueManagement
            onEdit={onEdit}
            onAdd={onAdd}
            revenues={revenues}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>

        {isOpenForm && (
          <RevenueForm
            setIsOpenForm={setIsOpenForm}
            initialData={selectedRevenue}
            onSubmit={handleSaveRevenue}
          />
        )}
      </div>
    </AuthGuard>
  );
}
