// app/hooks/useMultiStepForm.js
import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "multiStepFormState";
const STEP_COUNT = 3;

const defaultState = {
  step: 1,
  form: {
    step1: {
      email: "",
      brandName: "",
      countryCode: "",
      phone: "",
      storeUrl: "",
    },
    step2: {
      primaryFont: "",
      secondaryFont: "",
      additionalFonts: "",
      primaryColor: "",
      secondaryColor: "",
      otherColors: "",
    },
    step3: {
      checkoutApps: "",
      maxDiscount: "",
      brandWords: "",
    },
  },
};

export function useMultiStepForm() {
  const [step, setStep] = useState(defaultState.step);
  const [form, setForm] = useState(defaultState.form);

  // hydrate
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.step) setStep(parsed.step);
      if (parsed.form) setForm((f) => ({ ...f, ...parsed.form }));
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, form }));
    } catch {}
  }, [step, form]);

  const next = useCallback(
    () => setStep((s) => Math.min(s + 1, STEP_COUNT)),
    []
  );
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);
  const goTo = useCallback(
    (n) => setStep(Math.min(Math.max(n, 1), STEP_COUNT)),
    []
  );

  const updateField = useCallback((stepKey, field, value) => {
    setForm((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [field]: value,
      },
    }));
  }, []);

  const reset = useCallback(() => {
    setStep(defaultState.step);
    setForm(defaultState.form);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    step,
    form,
    next,
    back,
    goTo,
    updateField, // (stepKey, field, value)
    reset,
  };
}
