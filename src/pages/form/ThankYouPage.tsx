import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ThankYou from "@/components/ThankYou";
import { reset, setStep } from "@/features/formSlice";
import type { RootState, AppDispatch } from "@/store";

export default function ThankYouPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useLocation() || {};
  const brandNameFromState: string = state?.brandName || "";
  const submissionId: string = state?.submissionId || "";
  const brandNameFromRedux = useSelector(
    (s: RootState) => s.form?.step1?.brandName || "",
  );

  const brandName = brandNameFromState || brandNameFromRedux;

  const onRestart = () => {
    dispatch(reset());
    dispatch(setStep(1));
    navigate("/", { replace: true });
  };

  return (
    <ThankYou
      brandName={brandName}
      submissionId={submissionId}
      onRestart={onRestart}
    />
  );
}
