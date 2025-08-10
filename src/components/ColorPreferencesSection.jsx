import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

export default function ColorPreferencesSection({
  data,
  onChange,
  errors = {},
  required = false,
}) {
  const handleChange = (e) => onChange(e.target.name, e.target.value);

  // Normalize on blur: add # if missing, uppercase; accept 3 or 6 hex digits
  const normalizeHexOnBlur = (name, raw) => {
    if (!raw) return; // allow empty (Yup will decide if required)
    let v = String(raw).trim();
    if (v.startsWith("#")) v = v.slice(1);
    v = v.replace(/[^0-9a-fA-F]/g, ""); // strip non-hex chars
    if (v.length === 3 || v.length === 6) {
      onChange(name, `#${v.toUpperCase()}`);
    } else {
      // leave as-is; Yup error will show
      onChange(name, raw);
    }
  };

  // For the color picker we must provide a valid hex or fallback
  const asPickerValue = (val, fallback = "#FFFFFF") => {
    if (!val) return fallback;
    const m = String(val).trim();
    const hex = m.startsWith("#") ? m : `#${m}`;
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)
      ? hex.toUpperCase()
      : fallback;
  };

  const renderColorInput = (name, label, error) => {
    const pickerId = `${name}-picker`;

    const previewColor = asPickerValue(data[name]);

    return (
      <div className="w-full space-y-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-800">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <div className="relative">
          {/* Swatch — clicking opens the native color picker */}
          <label
            htmlFor={pickerId}
            className="absolute w-5 h-5 -translate-y-1/2 border rounded cursor-pointer left-3 top-1/2"
            style={{ backgroundColor: previewColor }}
            title="Pick color"
          />
          {/* Visually hidden, still accessible */}
          <input
            id={pickerId}
            type="color"
            value={previewColor}
            onChange={(e) => onChange(name, e.target.value.toUpperCase())}
            className="sr-only"
            aria-label={`${label} color picker`}
          />

          {/* Hex input */}
          <Input
            id={name}
            name={name}
            placeholder="#FFFFFF (hex code)"
            value={data[name] || ""}
            onChange={(e) => {
              let val = e.target.value.toUpperCase();
              // Allow only "#" or hex digits
              val = val.replace(/[^#0-9A-F]/g, "");
              // Limit length: max 7 chars if starts with "#", else 6
              if (val.startsWith("#")) {
                val = val.slice(0, 7);
              } else {
                val = val.slice(0, 6);
              }
              onChange(name, val);
            }}
            onBlur={(e) => normalizeHexOnBlur(name, e.target.value)}
            className={`w-full px-10 py-[10px] mt-1 text-sm rounded-md placeholder:text-slate-400 ${
              error ? "border-red-500 outline-red-500" : ""
            }`}
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderColorInput("primaryColor", "Primary color", errors.primaryColor)}
        {renderColorInput(
          "secondaryColor",
          "Secondary color",
          errors.secondaryColor
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="otherColors"
          className="text-sm font-medium text-gray-800"
        >
          Other brand colors (optional)
        </label>

        <Textarea
          id="otherColors"
          name="otherColors"
          placeholder="If you use other colors, list them here (e.g., #F5A623, #222222)"
          className={`w-full px-4 py-[10px] mt-1 text-sm rounded-md placeholder:text-slate-400 ${
            errors.otherColors ? "border-red-500" : "border-slate-300"
          }`}
          rows={3}
          value={data.otherColors || ""}
          onChange={handleChange}
        />

        {errors.otherColors && (
          <p className="text-sm text-red-500">{errors.otherColors}</p>
        )}
      </div>
    </div>
  );
}
