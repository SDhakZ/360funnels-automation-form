import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStep, updateField } from "../../features/formSlice";
import Stepper from "./Stepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { step1Schema, step2Schema } from "../validationSchema";

export default function MultiStepFormWithRedux() {
  const dispatch = useDispatch();
  const { step, step1, step2, step3 } = useSelector((s) => s.form);
  const [errors, setErrors] = useState({});

  const handleFieldChange = (stepKey, field, value) => {
    dispatch(updateField({ stepKey, field, value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear on type
  };

  const validateStep = async () => {
    try {
      const schema = step === 1 ? step1Schema : step === 2 ? step2Schema : null;
      if (!schema) return true;

      const data = step === 1 ? step1 : step2;
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errorMap = {};
      err.inner.forEach((e) => {
        errorMap[e.path] = e.message;
      });
      setErrors(errorMap);
      return false;
    }
  };

  const next = async () => {
    const isValid = await validateStep();
    if (isValid) dispatch(setStep(step + 1));
  };

  const back = () => dispatch(setStep(step - 1));

  const handleSubmit = () => {
    console.log("SUBMITTING FULL FORM", { step1, step2, step3 });
    alert("Submitted!");
  };

  return (
    <div className="max-w-[628px] p-8 mx-auto space-y-6">
      <Stepper
        currentStep={step}
        onSelect={(n) => dispatch(setStep(n))}
        allowedStep={3}
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
