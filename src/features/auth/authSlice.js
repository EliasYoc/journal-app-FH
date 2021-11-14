import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { selectLoading, setUiLoading } from "../ui/uiSlice";

const initialState = {};
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch(setUiLoading(true));
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName } = user;
      dispatch(setUiLoading(false));
      return { uid, displayName };
    } catch ({ code, message }) {
      dispatch(selectLoading(false));
      return { code, message };
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    normalLogin: (state, action) => {
      console.log(action);
      return action.payload;
    },
    logout: (state, action) => {
      state = {};
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      console.log("extraReducer full", action);
      return action.payload;
    },
    [loginUser.pending]: (state, action) => {
      console.log("extraReducer pending", action);

      return action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      console.log("extraReducer reject", action);

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
      console.log(action);
      return action.payload;
    },
  },
});

export const { normalLogin, logout } = authSlice.actions;

// export const selectUser = state => state.selector

export default authSlice.reducer;
