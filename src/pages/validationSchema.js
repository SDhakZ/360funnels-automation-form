import Yup from "yup";
const isLikelyValidUrl = (value) => {
  if (!value || typeof value !== "string") return false;
  let candidate = value.trim();
  // If no scheme, assume https
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(candidate)) {
    candidate = "https://" + candidate;
  }
  try {
    const url = new URL(candidate);
    // Basic hostname sanity: must have a dot and at least 2 chars in TLD-ish part
    const host = url.hostname;
    if (!host.includes(".")) return false;
    const parts = host.split(".");
    const tld = parts[parts.length - 1];
    if (tld.length < 2) return false; // reject something like "localhost" unless you want to allow it
    return true;
  } catch {
    return false;
  }
};

export const step1ValidationSchema = Yup.object().shape({
  email: Yup.string().trim().email("Invalid email").required("Required"),
  brandName: Yup.string().trim().required("Required"),
  phone: Yup.string().trim().required("Required"),
  storeUrl: Yup.string()
    .trim()
    .required("Required")
    .test("is-valid-url", "Invalid URL", (v) => isLikelyValidUrl(v)),
  brandBook: Yup.mixed()
    .test(
      "fileType",
      "Only PDF, images allowed",
      (file) =>
        !file ||
        (file &&
          ["application/pdf", "image/jpeg", "image/png"].includes(file.type))
    )
    .test(
      "fileSize",
      "Max 50MB allowed",
      (file) => !file || (file && file.size <= 50 * 1024 * 1024)
    ),
  primaryFont: Yup.string().trim().required("Required"),
  secondaryFont: Yup.string().trim().required("Required"),
  primaryColor: Yup.string().trim().required("Required"),
  secondaryColor: Yup.string().trim().required("Required"),
  otherColors: Yup.string().trim().notRequired(),
  thirdPartyCheckutApps: Yup.string().trim().notRequired(),
  maxDiscount: Yup.string().trim().required("Required"),
  brandPotrayal: Yup.string().trim().required("Required"),
});

export const step2ValidationSchema = Yup.object().shape({
  bestSellingProducts: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one product is required")
    .max(5, "Maximum 5 products allowed")
    .required(),
  productsWantToSell: Yup.array().of(Yup.string()).max(5),
  releaseFrequency: Yup.string().required("Required"),
  additionalNotes: Yup.string(),
  ageRange: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  painPoints: Yup.string().required("Required"),
  biggestFear: Yup.string().required("Required"),
  customerStory: Yup.string(),
  brandAdvantages: Yup.string().required("Required"),
  brandProblems: Yup.string(),
  brandFAQs: Yup.string(),
  brandCompetitors: Yup.string(),
});

export const step3ValidationSchema = Yup.object().shape({
  shippingInfo: Yup.string().required("Required"),
  adLibraryLink: Yup.string().url("Invalid URL").required("Required"),
  extraNotes: Yup.string(),
});
