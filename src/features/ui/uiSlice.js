import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  msgError: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setError: (state, action) => {
      return { ...state, msgError: action.payload };
    },
    removeError: (state, action) => {
      return { ...state, msgError: null };
    },
    setUiLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
  },
});

export const selectUiError = (state) => state.ui.msgError;
export const { setError, removeError, setUiLoading } = uiSlice.actions;
export const selectLoading = (state) => state.ui.loading;
export default uiSlice.reducer;
