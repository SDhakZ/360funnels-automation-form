import InputField from "@/components/InputField";

export default function FontPreferencesSection({
  data,
  onChange,
  errors = {},
}) {
  const handleChange = (e) => onChange(e.target.name, e.target.value);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          name="primaryFont"
          placeholder="e.g. Inter"
          label="Primary font"
          value={data.primaryFont || ""}
          onChange={handleChange}
          error={errors.primaryFont}
          required
        />
        <InputField
          name="secondaryFont"
          placeholder="e.g. Poppins"
          label="Secondary font"
          value={data.secondaryFont || ""}
          onChange={handleChange}
          error={errors.secondaryFont}
          required
        />
      </div>

      <InputField
        name="additionalFonts"
        placeholder="If you use other fonts for headings, accents, or UI feel free to list them here"
        label="Additional fonts (optional)"
        value={data.additionalFonts || ""}
        onChange={handleChange}
        error={errors.additionalFonts}
        type="textarea"
      />
    </div>
  );
}
