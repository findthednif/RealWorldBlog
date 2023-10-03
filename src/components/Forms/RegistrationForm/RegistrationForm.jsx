import "./RegistrationForm.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
} from "../FormsValidation";
import { registerUser } from "../../../Services/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { userDataFetchStart, userDataFetchEnd } from "../../Redux/User/actions";
import ReactLoading from "react-loading";
const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const { loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (userData) => {
    const data = {
      user: userData,
    };
    try {
      dispatch(userDataFetchStart());
      const responce = await registerUser(data);
      dispatch(userDataFetchEnd());
      navigate("/sign-in");
    } catch (error) {
      dispatch(userDataFetchEnd());
      if (error.status === 422) {
        setError("serverError", {
          type: "manual",
          message: "Email or Password is incorrect. Please, try again",
        });
      } else {
        console.error(error);
      }
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {loading && <ReactLoading type="spin" color="#1890ff" />}
      <h2 className="form__title">CREATE NEW ACCOUNT</h2>
      <label className="form__userdata">
        Username
        <input
          {...register("username", usernameValidation)}
          className={`userdata__input ${
            errors.username ? "userdata__input--invalid" : ""
          }`}
          type="text"
          placeholder="Username"
        />
        {errors.username && (
          <span className="userdata__error">{errors.username.message}</span>
        )}
      </label>
      <label className="form__userdata">
        Email
        <input
          {...register("email", emailValidation)}
          className={`userdata__input ${
            errors.email ? "userdata__input--invalid" : ""
          }`}
          type="email"
          placeholder="Email address"
        ></input>
        {errors.email && (
          <span className="userdata__error">{errors.email.message}</span>
        )}
      </label>
      <label className="form__userdata">
        Password
        <input
          {...register("password", passwordValidation)}
          className={`userdata__input ${
            errors.password ? "userdata__input--invalid" : ""
          }`}
          type="password"
          placeholder="Password"
        ></input>
        {errors.password && (
          <span className="userdata__error">{errors.password.message}</span>
        )}
      </label>
      <label className="form__userdata">
        Repeat Password
        <input
          {...register("confirmPassword", {
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          className={`userdata__input ${
            errors.confirmPassword ? "userdata__input--invalid" : ""
          }`}
          type="password"
          placeholder="Password"
        ></input>
        {errors.confirmPassword && (
          <span className="userdata__error">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <label className="form__agreement">
        <input className="agreement__checkbox" type="checkbox" required></input>
        <div className="agreement__text">
          I agree to the processing of my personal information
        </div>
      </label>
      <button className="form__submit" type="submit" disabled={!isValid}>
        Create
      </button>
      <span className="form__question">
        Already have an account?{" "}
        <Link to="/sign-in" className="question__link">
          Sign in
        </Link>
      </span>
    </form>
  );
};
export default RegistrationForm;
