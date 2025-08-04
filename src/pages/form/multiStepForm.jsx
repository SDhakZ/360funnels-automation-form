import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep, updateField } from "../../features/formSlice";
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

export default function MultiStepFormWithRedux() {
  const dispatch = useDispatch();
  const { step, step1, step2, step3 } = useSelector((s) => s.form);
  const [errors, setErrors] = React.useState({});

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
    const stepData = {
      1: step1,
      2: step2,
      3: step3,
    };

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
          errorMap[e.path] = e.message;
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
    // final validation of last step
    const isValid = await validateStep();
    if (!isValid) return;
    dispatch(submitOnboardingForm({ step1, step2, step3 }))
      .unwrap()
      .then((res) => {
        console.log("Success:", res);
        alert("Form submitted successfully!");
        // Optionally reset form
      })
      .catch((err) => {
        console.error("Submission error:", err);
        alert("There was an error submitting the form.");
      });
  };

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
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  );
}
