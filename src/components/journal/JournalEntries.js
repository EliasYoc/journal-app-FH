import JournalEntry from "./JournalEntry";

const JournalEntries = () => {
  const entries = Array(15).fill("hola");
  return (
    <div className="journal__entries">
      {entries.map((val, i) => (
        <JournalEntry key={i} />
      ))}
    </div>
  );
};

export default JournalEntries;
