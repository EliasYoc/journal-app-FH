const JournalEntry = () => {
  return (
    <div className="journal__entry pointer animate__animated animate__fadeIn animate__faster">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(https://placeimg.com/640/480/any)`,
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">{"title"}</p>
        <p className="journal__entry-content">{"body"}</p>
      </div>

      <div className="journal__entry-date-box">
        <span> {"5"} </span>
        <h4> {"s"} </h4>
      </div>
    </div>
  );
};

export default JournalEntry;
