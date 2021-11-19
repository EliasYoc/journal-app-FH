import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActive,
  startSaveNote,
  startUploading,
} from "../../features/note/noteSlice";

const NotesAppBarr = () => {
  const dispatch = useDispatch();
  const activedNote = useSelector(selectActive);
  const handleSave = () => {
    dispatch(startSaveNote(activedNote));
  };
  const handleUploadFile = () => {
    document.querySelector("#fileSelector").click();
  };
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    dispatch(startUploading(file));
  };
  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleInputChange}
      />

      <div>
        <button className="btn" onClick={handleUploadFile}>
          Upload Picture
        </button>

        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBarr;
