// app/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice.js";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});
