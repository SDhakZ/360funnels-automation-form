import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep, updateField } from "../../features/formSlice";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  step1ValidationSchema,
  step2ValidationSchema,
  step3ValidationSchema,
} from "./validationSchema";
import { submitOnboardingForm } from "@/thunk/formThunk";

export default function MultiStepFormWithRedux() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const brandBookRef = React.useRef([]); // [{id,file}]
  const { step, step1, step2, step3 } = useSelector((s) => s.form);
  const submissionLoading = useSelector((s) => s.form.loading);

  const [errors, setErrors] = React.useState({});
  const [errOpen, setErrOpen] = React.useState(false);
  const [errTitle, setErrTitle] = React.useState("Submission failed");
  const [errMessage, setErrMessage] = React.useState(
    "Something went wrong. Please try again."
  );

  const handleFieldChange = (stepKey, field, value) => {
    dispatch(updateField({ stepKey, field, value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBrandBookSelect = (files) => {
    const list = Array.isArray(files) ? files : files ? [files] : [];
    if (!list.length) return;

    const keyOf = (f) => `${f.name}|${f.size}|${f.lastModified}`;
    const existing = brandBookRef.current;
    const seen = new Set(existing.map((p) => keyOf(p.file)));

    const additions = list
      .filter((f) => !seen.has(keyOf(f)))
      .map((f) => ({
        id: crypto?.randomUUID?.() ?? `${Date.now()}-${f.name}`,
        file: f,
      }));

    brandBookRef.current = [...existing, ...additions];

    const meta = [
      ...(step1.brandBookMeta || []),
      ...additions.map(({ id, file }) => ({
        id,
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    ];
    dispatch(
      updateField({ stepKey: "step1", field: "brandBookMeta", value: meta })
    );
  };

  const handleRemoveBrandBook = (id) => {
    brandBookRef.current = brandBookRef.current.filter((p) => p.id !== id);
    const meta = (step1.brandBookMeta || []).filter((m) => m.id !== id);
    dispatch(
      updateField({ stepKey: "step1", field: "brandBookMeta", value: meta })
    );
  };

  const handleClearBrandBooks = () => {
    brandBookRef.current = [];
    dispatch(
      updateField({ stepKey: "step1", field: "brandBookMeta", value: [] })
    );
  };

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

  const showErrorModal = (title, message) => {
    setErrTitle(title || "Submission failed");
    setErrMessage(
      typeof message === "string"
        ? message
        : message?.message || "Something went wrong. Please try again."
    );
    setErrOpen(true);
  };

  const handleSubmit = async () => {
    const isValid = await validateStep();
    if (!isValid) return;

    const capturedBrandName = step1?.brandName || "";
    const files = brandBookRef.current.map((p) => p.file);

    dispatch(
      submitOnboardingForm({ step1, step2, step3, brandBookFiles: files })
    )
      .unwrap()
      .then((res) => {
        const id = res?.submissionId || res?.id || res?.data?.id || "";
        navigate("/thank-you", {
          replace: true,
          state: { brandName: capturedBrandName, submissionId: id },
        });
      })
      .catch((err) => {
        console.error("Submission error:", err);
        // Try to extract useful info
        const message =
          err?.message ||
          err?.error ||
          (typeof err === "string" ? err : null) ||
          "We couldn’t submit your form. Please check your connection and try again.";
        showErrorModal("Could not submit", message);
      });
  };

  return (
    <>
      <div className="mx-auto max-w-[628px] space-y-6 p-8">
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
                  onSelectBrandBook={handleBrandBookSelect}
                  onRemoveBrandBook={handleRemoveBrandBook}
                  onClearBrandBooks={handleClearBrandBooks}
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

      {/* Error Modal */}
      <Dialog open={errOpen} onOpenChange={setErrOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              {errTitle}
            </DialogTitle>
            <DialogDescription asChild>
              <div className="mt-1 text-sm text-muted-foreground">
                {errMessage}
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:justify-between">
            <Button variant="outline" onClick={() => setErrOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setErrOpen(false);
                handleSubmit();
              }}
            >
              Try again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
