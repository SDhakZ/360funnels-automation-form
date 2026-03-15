import React from "react";
import InputField from "@/components/InputField";

interface FontPreferencesSectionProps {
  data: Record<string, unknown>;
  onChange: (name: string, value: string) => void;
  errors?: Record<string, string>;
}

export default function FontPreferencesSection({
  data,
  onChange,
  errors = {},
}: FontPreferencesSectionProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => onChange(e.target.name, e.target.value);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          name="primaryFont"
          placeholder="e.g. Inter"
          label="Primary font"
          value={(data.primaryFont as string) || ""}
          onChange={handleChange}
          error={errors.primaryFont}
          required
        />
        <InputField
          name="secondaryFont"
          placeholder="e.g. Poppins"
          label="Secondary font"
          value={(data.secondaryFont as string) || ""}
          onChange={handleChange}
          error={errors.secondaryFont}
          required
        />
      </div>

      <InputField
        name="additionalFonts"
        placeholder="If you use other fonts for headings, accents, or UI feel free to list them here"
        label="Additional fonts (optional)"
        value={(data.additionalFonts as string) || ""}
        onChange={handleChange}
        error={errors.additionalFonts}
        type="textarea"
      />
    </div>
  );
}
