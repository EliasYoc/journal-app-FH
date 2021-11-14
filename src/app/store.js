import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import uiSlice from "../features/ui/uiSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiSlice,
  },
});
