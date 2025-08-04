import InputField from "../../components/InputField";
import PhoneInputField from "@/components/PhoneInputFIeld";
import FileUploadField from "@/components/FileUploadField";
import FontPreferencesSection from "@/components/FontPreferenceSection";
import ColorPreferencesSection from "@/components/ColorPreferencesSection";

export default function Step1({ data, onChange, errors = {} }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };
  const handlePhoneChange = (field, value) => {
    onChange(field, value);
  };

  const wrapClass = (errorKey) =>
    `bg-white outline outline-[1.5px] rounded-[8px] pt-5 pb-7 px-6 ${
      errors[errorKey] ? "outline-red-500" : "outline-slate-300"
    }`;

  return (
    <div className="space-y-6">
      <div className={wrapClass("email")}>
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={data.email || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <div className={wrapClass("brandName")}>
        <InputField
          name="brandName"
          label="Brand Name"
          placeholder="Enter your brand name"
          value={data.brandName || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.brandName}
          required
        />
      </div>

      <div className={wrapClass("phone")}>
        <PhoneInputField
          value={data.phone || ""}
          country={data.countryCode || "us"}
          onChange={(valueObj) => {
            handleChange("phone", valueObj.phone);
            handleChange("countryCode", valueObj.countryCode);
            handleChange("dialCode", valueObj.dialCode);
            handleChange("countryName", valueObj.name);
          }}
          error={errors.phone}
        />
      </div>

      <div className={wrapClass("storeUrl")}>
        <InputField
          name="storeUrl"
          label="Shopify store URL"
          type="url"
          placeholder="Enter your shopify store URL"
          value={data.storeUrl || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.storeUrl}
          required
        />
      </div>

      <div className={wrapClass("brandBook")}>
        <FileUploadField
          label="Brand Book"
          error={errors.brandBook}
          onFileSelect={(file) => onChange("brandBook", file)}
        />
      </div>

      <div
        className={`bg-white outline outline-[1.5px] rounded-[8px] pt-5 pb-7 px-7 ${
          errors.primaryFont || errors.secondaryFont
            ? "outline-red-500"
            : "outline-slate-300"
        }`}
      >
        <FontPreferencesSection
          data={data}
          onChange={onChange}
          errors={errors}
        />
      </div>

      <div
        className={`bg-white outline outline-[1.5px] rounded-[8px] pt-5 pb-7 px-7 ${
          errors.primaryColor || errors.secondaryColor
            ? "outline-red-500"
            : "outline-slate-300"
        }`}
      >
        <ColorPreferencesSection
          data={data}
          onChange={onChange}
          errors={errors}
        />
      </div>

      <div className={wrapClass("thirdPartyCheckutApps")}>
        <InputField
          name="thirdPartyCheckutApps"
          label="Third party checkout apps (leave blank if you don't use any)"
          type="text"
          placeholder="e.g. ReCharge, Shop Pay, AfterShip"
          value={data.thirdPartyCheckutApps || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.thirdPartyCheckutApps}
        />
      </div>

      <div className={wrapClass("maxDiscount")}>
        <InputField
          name="maxDiscount"
          label="Max % discount that you're willing to offer"
          type="text"
          placeholder="e.g. 10%"
          value={data.maxDiscount || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.maxDiscount}
          required
        />
      </div>

      <div className={wrapClass("brandPotrayal")}>
        <InputField
          name="brandPotrayal"
          label="Words to describe the way you want your brand to be portrayed?"
          type="text"
          placeholder="e.g. casual, funny, relatable, luxury…"
          value={data.brandPotrayal || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.brandPotrayal}
          required
        />
      </div>
    </div>
  );
}
