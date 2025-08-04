import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function InputField({
  onChange,
  required,
  placeholder,
  name,
  label,
  value,
  type = "text",
  error,
}) {
  return (
    <div className="flex flex-col gap-1 ">
      <label htmlFor={name} className="text-sm font-medium text-gray-800">
        {label} {required && "*"}
      </label>
      {type === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={`w-full px-4 py-[10px] mt-1 text-sm rounded-md placeholder:text-slate-400 ${
            error ? "border-red-500 outline-red-500" : ""
          }`}
          rows={3}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          className={`w-full px-4 py-[10px] mt-1 text-sm rounded-md placeholder:text-slate-400 ${
            error ? "border-red-500 outline-red-500" : ""
          }`}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
