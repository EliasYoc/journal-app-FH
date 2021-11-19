import { useDispatch } from "react-redux";
import { activeNote } from "../../features/note/noteSlice";

const JournalEntry = ({ id, date, title, body, url }) => {
  const dispatch = useDispatch();
  const dateObj = new Date(date);
  const dayString = dateObj.toLocaleString("es-MX", {
    weekday: "long",
  });
  const dateString = dateObj.toLocaleDateString("es-Mx", {
    dateStyle: "short",
  });
  const handleActiveNote = () => {
    dispatch(activeNote({ id, date, title, body, url }));
  };
  return (
    <div
      onClick={handleActiveNote}
      className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
    >
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span> {dayString} </span>
        <h4> {dateString} </h4>
      </div>
    </div>
  );
};

export default JournalEntry;
