"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Loading from "../common/Loading";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        router.replace("/login");
        return;
      }

      await api.get("/auth/me");
      setIsAuthorized(true);
    } catch (error) {
      localStorage.removeItem("accessToken");
      router.replace("/login");
    } finally {
      setIsChecking(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isChecking || !isAuthorized) {
    return <Loading />;
  }

  return children;
}
