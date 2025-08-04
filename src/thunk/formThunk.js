// app/redux/formThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const submitOnboardingForm = createAsyncThunk(
  "form/submitOnboardingForm",
  async ({ step1, step2, step3 }, thunkAPI) => {
    try {
      const formData = new FormData();

      const appendObject = (data, prefix = "") => {
        for (const key in data) {
          const value = data[key];

          if (Array.isArray(value)) {
            value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
          } else if (value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value ?? "");
          }
        }
      };

      appendObject(step1, "step1");
      appendObject(step2, "step2");
      appendObject(step3, "step3");
      console.log(formData);
      const response = await fetch("http://localhost:3000/v1/onboarding", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      return await response.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
