import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeNote, selectActive } from "../../features/note/noteSlice";
import { useForm } from "../../hooks/useForm";
import NotesAppBarr from "./NotesAppBarr";

const NoteScreen = () => {
  const activedNote = useSelector(selectActive);
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm(activedNote);
  const { body, title } = formValues;
  const idRef = useRef(activedNote.id);
  // console.log("refId", idRef);
  useEffect(() => {
    if (idRef.current !== activedNote.id) {
      reset(activedNote);
      idRef.current = activedNote.id;
    }
  }, [reset, activedNote]);
  useEffect(() => {
    dispatch(activeNote({ id: formValues.id, ...formValues }));
  }, [formValues, dispatch]);
  // console.log("idNote", activeNote.id);
  return (
    <div className="notes__main-content">
      <NotesAppBarr />
      <div className="notes__content">
        <input
          className="notes__title-input"
          type="text"
          name="title"
          placeholder="Some awesome title"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          className="notes__textarea"
          name="body"
          id=""
          cols="30"
          rows="10"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        {activedNote.url && (
          <div className="notes__image">
            <img src={activedNote.url} alt="s" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteScreen;
