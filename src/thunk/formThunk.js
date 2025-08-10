// app/redux/formThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE =
  import.meta?.env?.VITE_API_BASE_URL?.replace(/\/+$/, "") ||
  "http://localhost:3000/v1";

function errorFromResponseStatus(status, bodyText) {
  try {
    const j = JSON.parse(bodyText);
    return j?.message || j?.error || bodyText || `HTTP ${status}`;
  } catch {
    return bodyText || `HTTP ${status}`;
  }
}

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

      const res = await fetch(`${API_BASE}/onboarding`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(errorFromResponseStatus(res.status, text));
      }
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
