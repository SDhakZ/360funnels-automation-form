import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

export default function ColorPreferencesSection({
  data,
  onChange,
  errors = {},
}) {
  const handleChange = (e) => onChange(e.target.name, e.target.value);

  const renderColorInput = (name, label, error) => (
    <div className="w-full space-y-1">
      <label htmlFor={name} className="text-base font-medium text-gray-800">
        {label}
      </label>
      <div className="relative">
        {/* Color Preview Circle inside the input */}
        <div
          className="absolute w-5 h-5 -translate-y-1/2 border rounded left-3 top-1/2"
          style={{ backgroundColor: data[name] || "#FFFFFF" }}
        />
        <Input
          id={name}
          name={name}
          placeholder="#FFFFFF"
          value={data[name] || ""}
          onChange={handleChange}
          className={`w-full px-10 py-[10px] mt-1 text-base rounded-md placeholder:text-slate-400 ${
            error ? "border-red-500 outline-red-500" : ""
          }`}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderColorInput(
          "primaryColor",
          "Primary color *",
          errors.primaryColor
        )}
        {renderColorInput(
          "secondaryColor",
          "Secondary color *",
          errors.secondaryColor
        )}
      </div>
      <div className="space-y-1">
        <label
          htmlFor="otherColors"
          className="text-base font-medium text-gray-800"
        >
          Other brand colors (optional)
        </label>

        <Textarea
          id="otherColors"
          name="otherColors"
          placeholder="If you use other colors feel free to list them here"
          className={`w-full px-4 py-[10px] mt-1 text-base rounded-md placeholder:text-slate-400 ${
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
