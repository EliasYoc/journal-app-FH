import NotesAppBarr from "./NotesAppBarr";

const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBarr />
      <div className="notes__content">
        <input
          className="notes__title-input"
          type="text"
          placeholder="Some awesome title"
        />
        <textarea
          className="notes__textarea"
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <div className="notes__image">
          <img src="https://placeimg.com/640/480/nature" alt="s" />
        </div>
      </div>
    </div>
  );
};

export default NoteScreen;
