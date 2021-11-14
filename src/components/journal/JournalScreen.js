import React from "react";
import NoteScreen from "../notes/NoteScreen";
import { NothingSelected } from "./NothingSelected";
import Sidebar from "./Sidebar";

const JournalScreen = () => {
  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
      <Sidebar />
      <main>
        <NoteScreen />
        {/* <NothingSelected /> */}
      </main>
    </div>
  );
};

export default JournalScreen;
