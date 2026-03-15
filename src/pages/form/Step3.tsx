import React from "react";
import ListInput from "@/components/ListInput";
import InputField from "@/components/InputField";
import RadioGroupField from "@/components/RadioGroupField";
import type { Step3State } from "@/features/formSlice";

interface Step3Props {
  data: Step3State;
  onChange: (field: string, value: unknown) => void;
  errors?: Record<string, string>;
}

export default function Step3({ data, onChange, errors = {} }: Step3Props) {
  const handleChange = (field: string, value: unknown) => {
    onChange(field, value);
  };
  // lol
  const wrapClass = (errorKey: string) =>
    `bg-white outline outline-[1.5px] rounded-[8px] pt-5 pb-7 px-7 ${
      errors[errorKey] ? "outline-red-500" : "outline-slate-300"
    }`;
  return (
    <div className="space-y-6">
      <div className={wrapClass("shippingInfo")}>
        <InputField
          name="shippingInfo"
          label="Shipping time information"
          placeholder="e.g. We ship within 1–2 business days. Delivery takes 5–7 days depending on the location."
          value={data.shippingInfo || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.shippingInfo}
          required
          type="textarea"
        />
      </div>

      <div className={wrapClass("adLibraryLink")}>
        <InputField
          name="adLibraryLink"
          label="Ad Library link"
          placeholder="https://www.facebook.com/ads/library/..."
          value={data.adLibraryLink || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.adLibraryLink}
        />
      </div>

      <div className={wrapClass("extraNotes")}>
        <InputField
          name="extraNotes"
          label="Extra notes (if any)"
          placeholder="Anything you want to add?"
          value={data.extraNotes || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.extraNotes}
          type="textarea"
        />
      </div>
    </div>
  );
}
