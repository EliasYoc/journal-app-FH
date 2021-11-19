import { useSelector } from "react-redux";
import { selectNotes } from "../../features/note/noteSlice";
import JournalEntry from "./JournalEntry";

const JournalEntries = () => {
  const notes = useSelector(selectNotes);
  return (
    <div className="journal__entries">
      {notes.map((note) => (
        <JournalEntry key={note.id} {...note} />
      ))}
    </div>
  );
};

export default JournalEntries;
