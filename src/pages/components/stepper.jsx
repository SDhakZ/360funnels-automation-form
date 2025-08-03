// app/components/Stepper.js
import React from "react";

const steps = [
  "Brand & Business Identity",
  "Products & Customers",
  "Logistics and marketing",
];

// add prop allowedStep (highest step allowed to click)
export default function Stepper({ currentStep, onSelect, allowedStep }) {
  return (
    <div className="flex items-center justify-between w-full max-w-[628px] p-4 mx-auto bg-white border rounded-md">
      {steps.map((title, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const disabled = stepNumber > allowedStep;

        return (
          <React.Fragment key={index}>
            <div
              className={`flex flex-col items-center cursor-pointer ${
                disabled ? "opacity-40 cursor-not-allowed" : ""
              }`}
              onClick={() => !disabled && onSelect?.(stepNumber)}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium text-white transition ${
                  isActive ? "bg-black" : "bg-gray-300"
                }`}
              >
                {stepNumber}
              </div>
              <div className="mt-1 text-xs text-center w-28">{title}</div>
            </div>
            {index < steps.length - 1 && (
              <div className="self-center flex-1 h-px mx-2 bg-gray-300" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
