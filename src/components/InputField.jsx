import { Input } from "./ui/input";

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
    <div className="flex flex-col gap-1 bg-white outline outline-[1.5px] rounded-[8px] pt-5 pb-7 px-7 outline-slate-300">
      <label htmlFor={name} className="text-base font-medium text-gray-800">
        {label} {required && "*"}
      </label>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        className={`w-full px-4 py-[10px] mt-1 text-base rounded-md placeholder:text-slate-400 ${
          error ? "border-red-500 outline-red-500" : ""
        }`}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
