// app/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/formSlice";
import orgReducer from "./features/orgSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    organization: orgReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
