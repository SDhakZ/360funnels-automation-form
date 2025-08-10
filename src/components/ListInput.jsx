import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function ListInput({
  label = "Items",
  name = "items",
  value = [],
  onChange,
  maxItems = 5,
  placeholder = "Enter item",
  buttonLabel = "+ Add item",
  error,
  required = false, // <- renamed
  autoFocus = false, // <- used now
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const didFocus = useRef(false);

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || value.length >= maxItems) return;
    onChange(name, [...value, trimmed]);
    setInput("");
    // keep focusing for quick multiple entries
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleRemove = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(name, updated);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Focus only when allowed, and only once per mount
  useEffect(() => {
    if (autoFocus && !didFocus.current) {
      inputRef.current?.focus();
      didFocus.current = true;
    }
  }, [autoFocus]);

  return (
    <div className="w-full space-y-2">
      <label className="text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}{" "}
      </label>

      {value.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <Input
            className="w-full max-w-[300px] px-4 py-[10px] mt-1 text-base rounded-md placeholder:text-slate-400"
            value={item}
            disabled
          />
          <Button
            variant="ghost"
            className="text-red-500 border border-red-500 hover:bg-red-100"
            onClick={() => handleRemove(idx)}
            type="button"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ))}

      {value.length < maxItems && (
        <div className="flex items-center gap-2 mt-2">
          <Input
            ref={inputRef}
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full text-sm max-w-[300px] px-4 py-[10px] mt-1 rounded-md placeholder:text-slate-400"
          />
          <Button
            type="button"
            onClick={handleAdd}
            className="text-white bg-black"
          >
            {buttonLabel}
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
