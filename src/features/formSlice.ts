// app/redux/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitOnboardingForm } from "@/thunk/formThunk";

export interface BrandBookMeta {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface Step1State {
  email: string;
  brandName: string;
  phone: string;
  countryCode: string;
  dialCode: string;
  countryName: string;
  shopifyStoreUrl: string;
  brandBookId: string | null;
  brandAssetsMeta: BrandBookMeta[];
  brandBookMeta: BrandBookMeta[];
  primaryFont: string;
  secondaryFont: string;
  additionalFonts: string;
  primaryColor: string;
  secondaryColor: string;
  otherColors: string;
  thirdPartyCheckoutApps: string;
  maxDiscount: string;
  brandPortrayal: string;
}

export interface Step2State {
  bestSellingProducts: string[];
  productsWantToSell: string[];
  releaseFrequency: string;
  realeaseFrequencyAdditionalNotes: string;
  ageRange: string;
  gender: string;
  painPoints: string;
  biggestFear: string;
  customerStory: string;
  brandAdvantages: string;
  brandProblems: string;
  brandFAQs: string;
  brandCompetitors: string;
}

export interface Step3State {
  shippingInfo: string;
  adLibraryLink: string;
  extraNotes: string;
}

interface FormState {
  step: number;
  loading: boolean;
  step1: Step1State;
  step2: Step2State;
  step3: Step3State;
}

const initialState: FormState = {
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
    brandBookMeta: [],
    primaryFont: "",
    secondaryFont: "",
    additionalFonts: "",
    primaryColor: "",
    secondaryColor: "",
    otherColors: "",
    thirdPartyCheckoutApps: "",
    maxDiscount: "",
    brandPortrayal: "",
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
    setStep(state, action: PayloadAction<number>) {
      state.step = Math.min(Math.max(action.payload, 1), 3);
    },
    updateField(
      state,
      action: PayloadAction<{
        stepKey: "step1" | "step2" | "step3";
        field: string;
        value: unknown;
      }>,
    ) {
      const { stepKey, field, value } = action.payload;
      if (state[stepKey]) {
        (state[stepKey] as Record<string, unknown>)[field] = value;
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
