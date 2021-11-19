import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { setUiLoading } from "../ui/uiSlice";
const initialState = {};
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setUiLoading(true));
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName } = user;
      dispatch(setUiLoading(false));
      return { uid, displayName };
    } catch ({ code, message }) {
      // console.log("catch", code, message);
      dispatch(setUiLoading(false));
      Swal.fire("Error", message, code);
      // return rejectWithValue(`${code}: ${message}`);
    }
  }
);
export const loginWithGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async () => {
    const { user } = await signInWithPopup(auth, googleProvider);
    const { displayName, uid } = user;
    return { displayName, uid };
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user.displayName);
      await updateProfile(auth.currentUser, { displayName: name });
      const { displayName, uid } = user;
      return { displayName, uid };
    } catch (error) {
      return error;
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    normalLogin: (state, action) => {
      console.log(action);
      return action.payload;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      // console.log("extraReducer full", action);
      return action.payload;
    },
    [loginUser.pending]: (state, action) => {
      // console.log("extraReducer pending", action);

      return action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      // console.log("extraReducer reject", action);

      return action.payload;
    },
    [loginWithGoogle.fulfilled]: (state, action) => action.payload,
    [loginWithGoogle.pending]: (state, action) => action.payload,
    [loginWithGoogle.rejected]: (state, action) => action.payload,
    [registerUser.fulfilled]: (state, action) => {
      return action.payload;
    },
    [registerUser.pending]: (state, action) => action.payload,
    [registerUser.rejected]: (state, action) => {
      return action.payload;
    },
    [logout.fulfilled]: () => ({}),
    [logout.rejected]: () => ({}),
  },
});

export const { normalLogin } = authSlice.actions;

export const selectName = (state) => state.auth.displayName;

export default authSlice.reducer;
