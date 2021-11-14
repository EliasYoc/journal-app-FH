import { onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JournalScreen from "../components/journal/JournalScreen";
import { normalLogin } from "../features/auth/authSlice";
import { auth } from "../firebase/firebaseConfig";
import AuthRouter from "./AuthRouter";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("appRouter", user);
      if (user) {
        const { displayName, uid } = user;
        dispatch(normalLogin({ displayName, uid }));
        setIsAuth(true);
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
          <Route path="/auth" component={AuthRouter} />
          <Route exact path="/" component={JournalScreen} />
          <Route path="*" component={() => <h3>Not found</h3>} />
        </Switch>
      </>
    </Router>
  );
};

export default AppRouter;
