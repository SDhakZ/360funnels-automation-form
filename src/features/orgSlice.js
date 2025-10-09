import { createSlice } from "@reduxjs/toolkit";
import { fetchOrgByToken } from "@/thunk/orgThunk";

const initialState = {
  org: [],
  loading: false,
  error: null,
};

const orgSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrgByToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrgByToken.fulfilled, (state, action) => {
        state.org = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrgByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch organizations";
      });
  },
});

export default orgSlice.reducer;
