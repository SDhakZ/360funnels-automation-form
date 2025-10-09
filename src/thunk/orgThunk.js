import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const fetchOrgByToken = createAsyncThunk(
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
      return thunkAPI.rejectWithValue(errorFromAxios(err));
    }
  }
);
