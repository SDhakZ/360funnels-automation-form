// app/redux/formSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { submitOnboardingForm } from "@/thunk/formThunk";

const initialState = {
  step: 1,
  loading: false,
  step1: {
    email: "",
    brandName: "",
    phone: "",
    countryCode: "",
    dialCode: "",
    countryName: "",
    shopifyStoreUrl: "",
    brandBookId: null,
    brandAssetsMeta: [],
    primaryFont: "",
    secondaryFont: "",
    additionalFonts: "",
    primaryColor: "",
    secondaryColor: "",
    otherColors: "",
    thirdPartyCheckoutApps: "",
    maxDiscount: "",
    brandPotrayal: "",
  },
  step2: {
    bestSellingProducts: [],
    productsWantToSell: [],
    releaseFrequency: "",
    realeaseFrequencyAdditionalNotes: "",
    ageRange: "",
    gender: "",
    painPoints: "",
    biggestFear: "",
    customerStory: "",
    brandAdvantages: "",
    brandProblems: "",
    brandFAQs: "",
    brandCompetitors: "",
  },
  step3: {
    shippingInfo: "",
    adLibraryLink: "",
    extraNotes: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = Math.min(Math.max(action.payload, 1), 3);
    },
    updateField(state, action) {
      const { stepKey, field, value } = action.payload;
      if (state[stepKey]) {
        state[stepKey][field] = value;
      }
    },
    reset(state) {
      Object.assign(state, initialState);
    },
    hydrate(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOnboardingForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitOnboardingForm.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.loading = false;
      })
      .addCase(submitOnboardingForm.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setStep, updateField, reset, hydrate } = formSlice.actions;
export default formSlice.reducer;
