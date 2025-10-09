// src/components/ProtectedFormRoute.jsx
import { useEffect, useState } from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchOrgByToken } from "@/thunk/orgThunk";

export default function ProtectedFormRoute() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("loading"); // 'loading' | 'valid' | 'invalid'

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
