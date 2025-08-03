import React from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

export default function PhoneInputField({
  label = "Phone Number",
  country = "us",
  value,
  onChange,
  error,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-medium text-gray-800">{label} *</label>
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        inputStyle={{
          width: "100%",
          height: "42px",
          borderRadius: "8px",
          border: error ? "1.5px solid red" : "1.5px solid #CBD5E0",
          paddingLeft: "48px",
        }}
        buttonStyle={{
          borderTopLeftRadius: "8px",
          borderBottomLeftRadius: "8px",
          borderRight: "1px solid #CBD5E0",
        }}
        inputProps={{
          name: "phone",
          required: true,
        }}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
