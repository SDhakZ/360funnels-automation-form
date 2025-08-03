import * as yup from "yup";

export const step1Schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  brandName: yup.string().required("Brand name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const step2Schema = yup.object().shape({
  primaryFont: yup.string().required("Primary font is required"),
  secondaryFont: yup.string().required("Secondary font is required"),
});
