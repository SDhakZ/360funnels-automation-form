import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep, updateField, reset } from "../../features/formSlice";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  step1ValidationSchema,
  step2ValidationSchema,
  step3ValidationSchema,
} from "./validationSchema";
import { submitOnboardingForm } from "@/thunk/formThunk";
import ThankYou from "../../components/ThankYou";

export default function MultiStepFormWithRedux() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step, step1, step2, step3 } = useSelector((s) => s.form);
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [lastBrandName, setLastBrandName] = React.useState("");
  const submissionLoading = useSelector((s) => s.form.loading);

  const handleFieldChange = (stepKey, field, value) => {
    dispatch(updateField({ stepKey, field, value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // compute allowedStep based on validity of prior steps
  const allowedStep = React.useMemo(() => {
    const isStep1Valid = step1ValidationSchema.isValidSync(step1);
    const isStep2Valid = step2ValidationSchema.isValidSync(step2);
    if (isStep1Valid && isStep2Valid) return 3;
    if (isStep1Valid) return 2;
    return 1;
  }, [step1, step2]);

  const validateStep = async () => {
    const schemas = {
      1: step1ValidationSchema,
      2: step2ValidationSchema,
      3: step3ValidationSchema,
    };
    const stepData = { 1: step1, 2: step2, 3: step3 };
    const currentSchema = schemas[step];
    const currentData = stepData[step];
    if (!currentSchema) return true;

    try {
      await currentSchema.validate(currentData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errorMap = {};
      if (err.inner) {
        err.inner.forEach((e) => {
          if (e.path) errorMap[e.path] = e.message;
        });
      } else if (err.path) {
        errorMap[err.path] = err.message;
      }
      setErrors(errorMap);
      return false;
    }
  };

  const next = async () => {
    const isValid = await validateStep();
    if (isValid) dispatch(setStep(step + 1));
  };

  const back = () => dispatch(setStep(step - 1));

  const handleSubmit = async () => {
    // validate current step as you already do
    const isValid = await validateStep();
    if (!isValid) return;

    const capturedBrandName = step1?.brandName || "";

    dispatch(
      submitOnboardingForm({
        step1,
        step2,
        step3 /*, brandBookFile if you use ref */,
      })
    )
      .unwrap()
      .then((res) => {
        // Prefer a stable ID key from your API response
        const id = res?.submissionId || res?.id || res?.data?.id || "";
        navigate("/thank-you", {
          replace: true,
          state: {
            brandName: capturedBrandName,
            submissionId: id,
          },
        });
      })
      .catch((err) => {
        console.error("Submission error:", err);
        alert("There was an error submitting the form."); // or render a toast
      });
  };

  // Optional: navigation action for ThankYou
  const handleRestart = () => {
    dispatch(reset());
    setSubmitted(false);
    // Move user to step 1 explicitly
    dispatch(setStep(1));
  };

  const handleBackHome = () => {
    // If you have routing, navigate to dashboard/home:
    // navigate("/dashboard") or router.push("/dashboard");
    // Fallback: just restart form
    handleRestart();
  };

  // ✅ Show ThankYou page after success
  if (submitted) {
    return <ThankYou brandName={lastBrandName} onRestart={handleRestart} />;
  }

  // Default: show the form
  return (
    <div className="max-w-[628px] p-8 mx-auto space-y-6">
      <Stepper
        currentStep={step}
        onSelect={(n) => {
          if (n <= allowedStep) dispatch(setStep(n));
        }}
        allowedStep={allowedStep}
      />

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.2 }}
            >
              <Step1
                data={step1}
                onChange={(f, v) => handleFieldChange("step1", f, v)}
                errors={errors}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.2 }}
            >
              <Step2
                data={step2}
                onChange={(f, v) => handleFieldChange("step2", f, v)}
                errors={errors}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.2 }}
            >
              <Step3
                data={step3}
                onChange={(f, v) => handleFieldChange("step3", f, v)}
                errors={errors}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" disabled={step === 1} onClick={back}>
          Back
        </Button>
        {step < 3 ? (
          <Button onClick={next}>Continue</Button>
        ) : submissionLoading ? (
          <Button disabled>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
}
