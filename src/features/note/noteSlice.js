import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebaseConfig";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = createAsyncThunk(
  "notes/startNewNote",
  async (obj, thunk) => {
    try {
      const { uid } = thunk.getState().auth;
      const newNote = {
        title: "",
        body: "",
        date: new Date().getTime(),
      };
      const docRef = await addDoc(
        collection(db, uid, "journal", "notes"),
        newNote
      );
      return {
        id: docRef.id,
        ...newNote,
      };
    } catch (error) {
      console.log("error");
    }
  }
);
export const loadNotes = createAsyncThunk("notes/loadNote", async ({ uid }) => {
  const notesSnap = await getDocs(collection(db, uid, "journal", "notes"));
  const notes = [];
  notesSnap.forEach((doc) => notes.push({ id: doc.id, ...doc.data() }));
  return notes;
});
export const startSaveNote = createAsyncThunk(
  "notes/startSaveNote",
  async (objNote, { getState }) => {
    try {
      const { uid } = getState().auth;
      const noteToFirestore = { ...objNote };
      if (!noteToFirestore.url) delete noteToFirestore.url;
      delete noteToFirestore.id; //el id no se debe enviar porque ya lo tiene en firestore
      await updateDoc(
        doc(db, uid, "journal", "notes", objNote.id),
        noteToFirestore
      );
      Swal.fire("Guardado", objNote.title, "success");
      return objNote;
    } catch (error) {
      console.log(error);
    }
  }
);
export const startUploading = createAsyncThunk(
  "notes/startUploading",
  async (file, { getState, dispatch }) => {
    //preset name
    // react-journal-fh
    Swal.fire({
      title: "Subiendo archivo...",
      text: "Por favor espere...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const { activeNote } = getState().notes;
      const urlFile = await fileUpload(file);
      const noteToFirestore = { ...activeNote };
      noteToFirestore.url = urlFile;
      dispatch(startSaveNote(noteToFirestore));
      Swal.close();
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  notes: [],
  activeNote: null,
};
const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    activeNote: (state, action) => {
      return {
        ...state,
        activeNote: { ...action.payload },
      };
    },
    urlFileNote: () => {},
    deleteNote: () => {},
    logoutCleanNote: () => {},
  },
  extraReducers: {
    [startNewNote.fulfilled]: (state, action) => ({
      ...state,
      activeNote: { ...action.payload },
    }),
    [loadNotes.fulfilled]: (state, action) => ({
      ...state,
      notes: [...action.payload],
    }),
    [startSaveNote.fulfilled]: (state, action) => {
      // console.log(action.payload);
      return {
        ...state,
        notes: state.notes.map((note) =>
          action.payload.id === note.id ? action.payload : note
        ),
      };
    },
  },
});

export const { activeNote } = noteSlice.actions;
export const selectNotes = (state) => state.notes.notes;
export const selectActive = (state) => state.notes.activeNote;
export default noteSlice.reducer;
