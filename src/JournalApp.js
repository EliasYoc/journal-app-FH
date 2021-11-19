import { Provider } from "react-redux";
import store from "./app/store";
import AppRouter from "./routers/AppRouter";

const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default JournalApp;
