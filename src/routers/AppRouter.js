import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JournalScreen from "../components/journal/JournalScreen";
import { normalLogin } from "../features/auth/authSlice";
import { loadNotes } from "../features/note/noteSlice";
import { auth } from "../firebase/firebaseConfig";
import AuthRouter from "./AuthRouter";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, uid } = user;
        dispatch(normalLogin({ displayName, uid }));
        setIsAuth(true);
        dispatch(loadNotes({ uid }));
      } else {
        setIsAuth(false);
      }
      setChecking(false);
    });
  }, [dispatch]);
  if (checking) return <h4>Espera..</h4>;
  return (
    <Router>
      <>
        <Switch>
          <PublicRoute isAuth={isAuth} path="/auth" component={AuthRouter} />
          <PrivateRoute
            exact
            isAuth={isAuth}
            path="/"
            component={JournalScreen}
          />
          <Route path="*" component={() => <h3>Not found</h3>} />
        </Switch>
      </>
    </Router>
  );
};

export default AppRouter;
