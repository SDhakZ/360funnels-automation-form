import { z } from "zod";

const isLikelyValidHttpUrl = (value: string) => {
  let url = value.trim();
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) {
    url = `https://${url}`;
  }

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes(".")) return false;
    return /^https?:$/.test(parsed.protocol);
  } catch {
    return false;
  }
};

const requiredText = (max: number) =>
  z.string().trim().min(1, "Required").max(max, `Max ${max} characters`);

const optionalText = (max: number) =>
  z.string().trim().max(max, `Max ${max} characters`);

const requiredHexColor = z
  .string()
  .trim()
  .transform((value) => (value && !value.startsWith("#") ? `#${value}` : value))
  .refine(
    (value) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value),
    "Use 3 or 6-digit hex, e.g. #1A2B3C",
  );

export const step1ValidationSchema = z.object({
  email: z.string().trim().min(1, "Required").email("Invalid email").max(254),
  brandName: requiredText(100),
  phone: requiredText(32),
  shopifyStoreUrl: z
    .string()
    .trim()
    .min(1, "Required")
    .refine((value) => isLikelyValidHttpUrl(value), "Invalid URL"),

  brandBookId: z.string().nullable(),
  primaryFont: requiredText(100),
  secondaryFont: requiredText(100),
  primaryColor: requiredHexColor,
  secondaryColor: requiredHexColor,
  otherColors: optionalText(1000),
  thirdPartyCheckoutApps: optionalText(500),
  maxDiscount: requiredText(20),
  brandPortrayal: requiredText(500),
});

export const step2ValidationSchema = z.object({
  bestSellingProducts: z
    .array(requiredText(120))
    .min(1, "At least one product is required")
    .max(5, "Maximum 5 products allowed"),
  productsWantToSell: z.array(optionalText(120)).max(5),
  releaseFrequency: requiredText(80),
  realeaseFrequencyAdditionalNotes: optionalText(500),
  ageRange: optionalText(40),
  gender: optionalText(40),
  painPoints: optionalText(5000),
  biggestFear: optionalText(5000),
  customerStory: optionalText(3000),
  brandAdvantages: requiredText(2000),
  brandProblems: optionalText(2000),
  brandFAQs: optionalText(5000),
  brandCompetitors: optionalText(1000),
});

export const step3ValidationSchema = z.object({
  shippingInfo: requiredText(1500),
  adLibraryLink: z
    .string()
    .trim()
    .max(2048, "Max 2048 characters")
    .refine((value) => value === "" || isLikelyValidHttpUrl(value), "Invalid URL"),
  extraNotes: optionalText(2000),
});
