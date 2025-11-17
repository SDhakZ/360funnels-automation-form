// app/redux/formThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

// Utility for better error messages
function errorFromAxios(err) {
  if (err.response) {
    const data = err.response.data;
    return data?.message || data?.error || `HTTP ${err.response.status}`;
  } else if (err.request) {
    return "No response from server";
  } else {
    return err.message;
  }
}

export const submitOnboardingForm = createAsyncThunk(
  "form/submitOnboardingForm",
  async ({ step1, step2, step3, brandBookFiles, token }, thunkAPI) => {
    try {
      const formData = new FormData();

      // Flatten objects so API can parse them
      const { brandBookMeta, brandAssetsMeta, brandBookId, ...step1ForApi } =
        step1;

      const appendFlat = (obj) => {
        for (const key in obj) {
          const val = obj[key];
          if (Array.isArray(val)) {
            formData.append(key, JSON.stringify(val));
          } else if (val !== null && typeof val === "object") {
            formData.append(key, JSON.stringify(val));
          } else {
            formData.append(key, val ?? "");
          }
        }
      };

      appendFlat(step1ForApi);
      appendFlat(step2);
      appendFlat(step3);

      if (Array.isArray(brandBookFiles)) {
        brandBookFiles.forEach((file) => {
          formData.append("brandBook", file, file.name);
        });
      }

      const { data } = await api.post("/onboarding", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      });

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(errorFromAxios(err));
    }
  }
);
