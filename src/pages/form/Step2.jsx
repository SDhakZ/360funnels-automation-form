import React from "react";
import ListInput from "@/components/ListInput";
import InputField from "@/components/InputField";
import RadioGroupField from "@/components/RadioGroupField";

export default function Step2({ data, onChange, errors = {} }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const wrapClass = (errorKey) =>
    `bg-white outline outline-[1.5px] rounded-[8px] pt-5 pb-7 px-7 ${
      errors[errorKey] ? "outline-red-500" : "outline-slate-300"
    }`;
  return (
    <div className="space-y-6">
      <div className={wrapClass("colorPreferences")}>
        <ListInput
          reqired
          name="bestSellingProducts"
          label="Best selling products (1–5 products)"
          value={data.bestSellingProducts || []}
          onChange={(field, val) => handleChange(field, val)}
          maxItems={5}
          placeholder="Enter product name"
          buttonLabel="+ Add product"
          error={errors.bestSellingProducts}
        />
      </div>
      <div className={wrapClass("colorPreferences")}>
        <ListInput
          name="productsWantToSell"
          label="Products you want to sell more (if any)"
          value={data.productsWantToSell || []}
          onChange={(field, val) => handleChange(field, val)}
          maxItems={5}
          placeholder="Enter product name"
          buttonLabel="+ Add product"
          error={errors.productsWantToSell}
        />
      </div>
      <div className={`${wrapClass("colorPreferences")} space-y-6`}>
        <RadioGroupField
          name="releaseFrequency"
          label="How often do you release new products?"
          value={data.releaseFrequency}
          onChange={onChange}
          options={[
            "Weekly",
            "Biweekly",
            "Monthly",
            "Quarterly",
            "Irregular/ not fixed",
          ]}
          error={errors.releaseFrequency}
          required
        />
        <InputField
          name="realeaseFrequencyAdditionalNotes"
          label="Additional notes"
          placeholder="Enter any additional notes here"
          value={data.realeaseFrequencyAdditionalNotes || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.realeaseFrequencyAdditionalNotes}
          type="textarea"
        />
      </div>

      <div className={`${wrapClass("ageRange")} space-y-6`}>
        <p className="text-base font-semibold text-gray-800">
          Ideal Customer Profile *
        </p>

        <InputField
          name="ageRange"
          label="Age range"
          placeholder="e.g. 25–45, 30+, all age group"
          value={data.ageRange || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.ageRange}
          required
        />

        <InputField
          name="gender"
          label="Gender"
          placeholder="e.g. Female, Male, Non binary, All"
          value={data.gender || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.gender}
          required
        />

        <InputField
          name="painPoints"
          label="Pain points"
          placeholder="e.g. Skin irritation, unsure which product fits them, delivery taking too long, price concerns"
          value={data.painPoints || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.painPoints}
          required
        />

        <InputField
          name="biggestFear"
          label="Biggest fear"
          placeholder="e.g. What if it doesn’t work for me? What if I don’t see results? Can I trust this brand?"
          value={data.biggestFear || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.biggestFear}
          required
        />

        <InputField
          name="customerStory"
          label="Customer Persona Story (optional)"
          placeholder="e.g. She’s 42, tired of dull, uneven skin, and feels like she’s lost her glow..."
          value={data.customerStory || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.customerStory}
          type="textarea"
        />
      </div>
      <div className={wrapClass("brandAdvantages")}>
        <InputField
          name="brandAdvantages"
          label="Advantages of your brand? (What makes you stand out?)"
          placeholder="e.g. Handcrafted in small batches, eco-friendly packaging, 24/7 customer support"
          value={data.brandAdvantages || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.brandAdvantages}
          required
          type="textarea"
        />
      </div>

      <div className={wrapClass("brandProblems")}>
        <InputField
          name="brandProblems"
          label="What problems does your brand solve?"
          placeholder="e.g. Eliminates dry skin issues, simplifies skincare for busy professionals..."
          value={data.brandProblems || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.brandProblems}
          type="textarea"
        />
      </div>

      <div className={wrapClass("brandFAQs")}>
        <InputField
          name="brandFAQs"
          label="What are some Frequently Asked Questions/concerns your customers have after buying from you?"
          placeholder="e.g. When will my order arrive? How do I track my package? Can I return this?"
          value={data.brandFAQs || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.brandFAQs}
          type="textarea"
        />
      </div>

      <div className={wrapClass("brandCompetitors")}>
        <InputField
          name="brandCompetitors"
          label="Competitors (if any)"
          placeholder="e.g. Other brands you compete with"
          value={data.brandCompetitors || ""}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          error={errors.brandCompetitors}
          type="textarea"
        />
      </div>
    </div>
  );
}
