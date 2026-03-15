import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { AxiosError } from "axios";

function errorFromAxios(err: AxiosError<{ message?: string; error?: string }>) {
  if (err.response) {
    const data = err.response.data;
    return data?.message || data?.error || `HTTP ${err.response.status}`;
  } else if (err.request) {
    return "No response from server";
  } else {
    return err.message;
  }
}

export const fetchOrgByToken = createAsyncThunk<unknown, string>(
  "form/fetchOrgByToken",
  async (token, thunkAPI) => {
    try {
      const { data } = await api.get(`/organization`, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      return data.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        errorFromAxios(err as AxiosError<{ message?: string; error?: string }>),
      );
    }
  },
);
