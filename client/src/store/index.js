import { configureStore } from "@reduxjs/toolkit";
import emergencyReducer from "./emergencySlice";

export const store = configureStore({
  reducer: {
    emergency: emergencyReducer,
  },
});
