import InputField from "../../components/InputField";
import PhoneInputField from "@/components/PhoneInputFIeld";
import FileUploadField from "@/components/FileUploadField";
import FontPreferencesSection from "@/components/FontPreferenceSection";
import ColorPreferencesSection from "@/components/ColorPreferencesSection";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export default function Step1({
  data,
  onChange,
  errors = {},
  onSelectBrandBook,
  onRemoveBrandBook,
  onClearBrandBooks,
}) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const wrapClass = (errorKey) =>
    `bg-white outline outline-[1.5px] rounded-[8px] pt-5 pb-7 px-6 ${
      errors[errorKey] ? "outline-red-500" : "outline-slate-300"
    }`;
  const items = data?.brandBookMeta || [];
  const selectedLabel = items.length
    ? `${items.length} file(s) selected`
    : undefined;

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

      <div className={wrapClass("shopifyStoreUrl")}>
        <InputField
          name="shopifyStoreUrl"
          label="Shopify store URL"
          type="url"
          placeholder="Enter your shopify store URL"
          value={data.shopifyStoreUrl || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.shopifyStoreUrl}
          required
        />
      </div>

      <div className={wrapClass("brandBook")}>
        <FileUploadField
          label="Brand book / assets"
          error={errors.brandBook}
          onFileSelect={onSelectBrandBook}
          multiple
          selectedLabel={selectedLabel}
          alreadySelectedCount={(data?.brandBookMeta || []).length}
        />

        {items.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">Selected files</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClearBrandBooks}
              >
                Clear all
              </Button>
            </div>

            <ul className="border divide-y rounded-md">
              {items.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between px-3 py-2 text-sm"
                >
                  <div className="min-w-0">
                    <div className="font-medium truncate">{m.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {(m.size / 1024).toFixed(0)} KB • {m.type || "file"}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                    onClick={() => onRemoveBrandBook(m.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
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
          required
        />
      </div>

      <div className={wrapClass("thirdPartyCheckoutApps")}>
        <InputField
          name="thirdPartyCheckoutApps"
          label="Third party checkout apps (leave blank if you don't use any)"
          type="text"
          placeholder="e.g. ReCharge, Shop Pay, AfterShip"
          value={data.thirdPartyCheckoutApps || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.thirdPartyCheckoutApps}
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
