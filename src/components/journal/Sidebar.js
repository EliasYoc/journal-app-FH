import { useDispatch, useSelector } from "react-redux";
import { logout, selectName } from "../../features/auth/authSlice";
import { startNewNote } from "../../features/note/noteSlice";
import JournalEntries from "./JournalEntries";

const Sidebar = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddNew = () => {
    dispatch(startNewNote());
  };
  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> {name}</span>
        </h3>

        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={handleAddNew}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
