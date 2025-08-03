import * as yup from "yup";

const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;

export const step1Schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),

  brandName: yup.string().required("Brand name is required"),

  phone: yup.string().required("Phone number is required"),

  storeUrl: yup
    .string()
    .url("Must be a valid URL")
    .required("Shopify store URL is required"),

  brandBook: yup
    .mixed()
    .required("Brand book is required")
    .test("fileSize", "File too large", (file) =>
      file ? file.size <= 50 * 1024 * 1024 : false
    )
    .test("fileType", "Unsupported file type", (file) =>
      file
        ? [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "image/png",
            "image/jpeg",
            "image/webp",
          ].includes(file.type)
        : false
    ),

  // Font Preferences
  primaryFont: yup.string().required("Primary font is required"),

  secondaryFont: yup.string().required("Secondary font is required"),

  additionalFonts: yup.string().notRequired(),

  // Color Preferences
  primaryColor: yup
    .string()
    .matches(hexColorRegex, "Must be a valid HEX color")
    .required("Primary color is required"),

  secondaryColor: yup
    .string()
    .matches(hexColorRegex, "Must be a valid HEX color")
    .required("Secondary color is required"),

  otherColors: yup.string().notRequired(),

  thirdPartyCheckutApps: yup.string().notRequired(),

  maxDiscount: yup
    .string()
    .required("Max discount is required")
    .matches(/^\d+%?$/, "Must be a number or percentage, e.g. 10 or 10%"),

  brandPotrayal: yup
    .string()
    .required("Brand portrayal description is required"),
});

export const step2Schema = yup.object().shape({});
