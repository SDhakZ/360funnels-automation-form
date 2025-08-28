import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ThankYou from "@/components/ThankYou";
import { reset, setStep } from "@/features/formSlice";

export default function ThankYouPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation() || {};
  const brandNameFromState = state?.brandName || "";
  const submissionId = state?.submissionId || "";
  const brandNameFromRedux = useSelector((s) => s.form?.step1?.brandName || "");

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
