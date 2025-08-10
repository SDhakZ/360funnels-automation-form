// app/redux/formThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const submitOnboardingForm = createAsyncThunk(
  "form/submitOnboardingForm",
  async ({ step1, step2, step3, brandBookFile }, thunkAPI) => {
    try {
      const formData = new FormData();

      const appendObject = (data, prefix = "") => {
        for (const key in data) {
          const value = data[key];
          if (Array.isArray(value)) {
            value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
          } else if (
            value !== undefined &&
            value !== null &&
            typeof value !== "object"
          ) {
            formData.append(key, value);
          } else if (value instanceof Blob) {
            // (not used here, we avoid putting File/Blob in state)
            formData.append(key, value);
          } else {
            // For objects/arrays we didn't handle, you can stringify if needed.
            // Here, we avoid pushing complex objects.
            formData.append(key, "");
          }
        }
      };

      appendObject(step1, "step1");
      appendObject(step2, "step2");
      appendObject(step3, "step3");

      // Append actual file under a known field name
      if (brandBookFile) {
        formData.append("brandBook", brandBookFile);
      }

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
