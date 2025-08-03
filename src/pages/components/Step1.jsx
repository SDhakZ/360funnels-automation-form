import InputField from "../../components/InputField";

export default function Step1({ data, onChange, errors = {} }) {
  const handle = (e) => onChange(e.target.name, e.target.value);

  return (
    <div className="space-y-4">
      <InputField
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={data.email || ""}
        onChange={handle}
        error={errors.email}
        required
      />
      <InputField
        name="brandName"
        label="Brand Name"
        placeholder="Enter your brand name"
        value={data.brandName || ""}
        onChange={handle}
        error={errors.brandName}
        required
      />
    </div>
  );
}
