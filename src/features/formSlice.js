// app/redux/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  step1: {
    email: "",
    brandName: "",
    countryCode: "",
    phone: "",
    storeUrl: "",
  },
  step2: {
    primaryFont: "",
    secondaryFont: "",
    primaryColor: "",
    secondaryColor: "",
  },
  step3: {
    checkoutApps: "",
    maxDiscount: "",
    brandWords: "",
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
      // payload: { stepKey: 'step1', field: 'email', value: 'foo' }
      const { stepKey, field, value } = action.payload;
      if (state[stepKey]) {
        state[stepKey][field] = value;
      }
    },
    reset(state) {
      Object.assign(state, initialState);
    },
    hydrate(state, action) {
      // for restoring from localStorage
      return { ...state, ...action.payload };
    },
  },
});

export const { setStep, updateField, reset, hydrate } = formSlice.actions;
export default formSlice.reducer;
