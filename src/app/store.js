import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import noteSlice from "../features/note/noteSlice";
import uiSlice from "../features/ui/uiSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiSlice,
    notes: noteSlice,
  },
});
