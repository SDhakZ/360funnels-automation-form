import { createSlice } from "@reduxjs/toolkit";
import { fetchOrgByToken } from "@/thunk/orgThunk";

export interface Organization {
  id?: number | string;
  name?: string;
  logo?: string;
  [key: string]: unknown;
}

interface OrgState {
  org: Organization | Organization[];
  loading: boolean;
  error: string | null;
}

const initialState: OrgState = {
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
        state.org = action.payload as Organization | Organization[];
        state.loading = false;
      })
      .addCase(fetchOrgByToken.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to fetch organizations";
      });
  },
});

export default orgSlice.reducer;
