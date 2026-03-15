// src/components/ProtectedFormRoute.tsx
import { useEffect, useState } from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchOrgByToken } from "@/thunk/orgThunk";
import type { AppDispatch } from "@/store";

type AuthStatus = "loading" | "valid" | "invalid";

export default function ProtectedFormRoute() {
  const { token } = useParams<{ token: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const checkToken = async () => {
      try {
        const activeToken = token || sessionStorage.getItem("formToken");
        if (!activeToken) throw new Error("Missing token");

        // store for interceptors
        sessionStorage.setItem("formToken", activeToken);

        await dispatch(fetchOrgByToken(activeToken)).unwrap();
        setStatus("valid");
      } catch {
        setStatus("invalid");
      }
    };

    checkToken();
  }, [token, dispatch]);

  if (status === "invalid") return <Navigate to="/link-expired" replace />;

  return <Outlet />;
}
