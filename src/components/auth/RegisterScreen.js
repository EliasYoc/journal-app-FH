import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch } from "react-redux";
import {
  removeError,
  selectUiError,
  setError,
} from "../../features/ui/uiSlice";
import { useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
const initialForm = {
  name: "",
  email: "",
  password: "",
  password2: "",
};
const RegisterScreen = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectUiError);
  const [formValues, handleInputChange] = useForm(initialForm);
  const { name, email, password, password2 } = formValues;
  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(registerUser({ name, email, password }));
    }
  };
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));

      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password2 !== password || password2.length < 5) {
      dispatch(
        setError(
          "password should be at least 6 characters and match each other"
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        {error && <div className="auth__alert-error">{error}</div>}
        <input
          className="auth__input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          value={name}
        />
        <input
          className="auth__input"
          type="text"
          name="email"
          placeholder="email"
          onChange={handleInputChange}
          value={email}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="password"
          onChange={handleInputChange}
          value={password}
        />
        <input
          className="auth__input"
          type="password"
          name="password2"
          placeholder="Confirm"
          onChange={handleInputChange}
          value={password2}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link className="link mt-5" to="/auth/login">
          already registered
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
