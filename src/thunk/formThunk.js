// app/redux/formThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const submitOnboardingForm = createAsyncThunk(
  "form/submitOnboardingForm",
  async ({ step1, step2, step3, brandBookFiles }, thunkAPI) => {
    try {
      const formData = new FormData();
      const { brandBookMeta, brandAssetsMeta, brandBookId, ...step1ForApi } =
        step1;
      const appendFlat = (obj) => {
        for (const key in obj) {
          const val = obj[key];
          if (Array.isArray(val)) {
            // stringify arrays of primitives; avoid nesting complex objects
            formData.append(`${key}`, JSON.stringify(val));
          } else if (val !== null && typeof val === "object") {
            // avoid sending nested objects directly
            formData.append(`${key}`, JSON.stringify(val));
          } else {
            formData.append(`${key}`, val ?? "");
          }
        }
      };

      appendFlat(step1ForApi, "step1");
      appendFlat(step2, "step2");
      appendFlat(step3, "step3");

      if (Array.isArray(brandBookFiles)) {
        brandBookFiles.forEach((file, i) => {
          formData.append(`brandBook`, file, file.name);
        });
      }

      const res = await fetch("http://localhost:3000/v1/onboarding", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to submit form");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
