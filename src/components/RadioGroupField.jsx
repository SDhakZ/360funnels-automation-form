import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function RadioGroupField({
  name,
  label,
  options = [],
  value,
  onChange,
  error,
  required,
}) {
  return (
    <div className="space-y-3">
      {label && (
        <p className="text-base font-medium text-gray-800">
          {label} {required && "*"}
        </p>
      )}

      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(name, val)}
        className="space-y-2"
      >
        {options.map((option, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-slate-800">
            <RadioGroupItem id={`${name}-${idx}`} value={option} />
            <Label htmlFor={`${name}-${idx}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
