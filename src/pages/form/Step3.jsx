import React from "react";
import ListInput from "@/components/ListInput";
import InputField from "@/components/InputField";
import RadioGroupField from "@/components/RadioGroupField";

export default function Step3({ data, onChange, errors = {} }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const wrapClass = (errorKey) =>
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
          required
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
