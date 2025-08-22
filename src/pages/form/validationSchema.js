// validationSchema.js
import * as Yup from "yup";

const hexColor = Yup.string()
  .transform((v) => (v && !v.startsWith("#") ? `#${v}` : v))
  .matches(
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    "Use 3 or 6‑digit hex, e.g. #1A2B3C"
  )
  .required("Required");

const shortText = (max) =>
  Yup.string().trim().max(max, `Max ${max} characters`);
const longText = (max) => Yup.string().trim().max(max, `Max ${max} characters`);

export const step1ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email")
    .max(254)
    .required("Required"),
  brandName: shortText(100).required("Required"),
  phone: shortText(32).required("Required"),
  shopifyStoreUrl: Yup.string()
    .trim()
    .required("Required")
    .test("is-valid-url", "Invalid URL", (v) => {
      if (!v) return false;

      // Prepend https:// if scheme is missing
      let url = v.trim();
      if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) {
        url = "https://" + url;
      }

      try {
        const u = new URL(url);

        // Must have a dot in the hostname (prevents "localhost", "test" etc.)
        if (!u.hostname.includes(".")) return false;

        // Only allow http/https
        if (!/^https?:$/.test(u.protocol)) return false;

        return true;
      } catch {
        return false;
      }
    }),

  brandBookId: Yup.string().nullable(),
  primaryFont: shortText(100).required("Required"),
  secondaryFont: shortText(100).required("Required"),
  primaryColor: hexColor,
  secondaryColor: hexColor,
  otherColors: longText(1000),
  thirdPartyCheckoutApps: longText(500),
  maxDiscount: shortText(20).required("Required"),
  brandPotrayal: longText(500).required("Required"),
});

export const step2ValidationSchema = Yup.object().shape({
  bestSellingProducts: Yup.array()
    .of(shortText(120).required())
    .min(1, "At least one product is required")
    .max(5, "Maximum 5 products allowed")
    .required(),
  productsWantToSell: Yup.array().of(shortText(120)).max(5),
  releaseFrequency: shortText(80).required("Required"),
  realeaseFrequencyAdditionalNotes: longText(500),
  ageRange: shortText(40).required("Required"),
  gender: shortText(40).required("Required"),
  painPoints: longText(5000).required("Required"),
  biggestFear: longText(5000).required("Required"),
  customerStory: longText(3000),
  brandAdvantages: longText(2000).required("Required"),
  brandProblems: longText(2000),
  brandFAQs: longText(5000),
  brandCompetitors: longText(1000),
});

export const step3ValidationSchema = Yup.object().shape({
  shippingInfo: longText(1500).required("Required"),
  adLibraryLink: Yup.string()
    .trim()
    .max(2048)
    .url("Invalid URL")
    .required("Required"),
  extraNotes: longText(2000),
});
