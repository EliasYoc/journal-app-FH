import React from "react";
import { useSelector } from "react-redux";
import { selectActive } from "../../features/note/noteSlice";
import NoteScreen from "../notes/NoteScreen";
import { NothingSelected } from "./NothingSelected";
import Sidebar from "./Sidebar";

const JournalScreen = () => {
  const activeNote = useSelector(selectActive);
  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
      <Sidebar />
      <main>{activeNote ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};

export default JournalScreen;
