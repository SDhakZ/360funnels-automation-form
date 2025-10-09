// app/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice.js";
import orgReducer from "./features/orgSlice.js";

export const store = configureStore({
  reducer: {
    form: formReducer,
    organization: orgReducer,
  },
});
