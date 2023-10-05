import styles from "./LoginForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "../FormsValidation";
import { loginUser } from "../../../Services/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userDataFetchStart, userDataFetchEnd } from "../../Redux/User/actions"
import ReactLoading from 'react-loading';
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    form,
    form__title,
    form__userdata,
    userdata__input,
    userdata__error,
    invalid,
    form__submit,
    form__question,
    homepageLink,
  } = styles;
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { loading } = useSelector(state =>state.userReducer)
  const onSubmit = async (userData) => {
    const data = {
      user: userData,
    };
    try {
      dispatch(userDataFetchStart())
      const responce = await loginUser(data);
      localStorage.setItem('token', JSON.stringify(responce.user.token))
      localStorage.setItem("userData", JSON.stringify(responce));
      dispatch(userLogin(responce));
      dispatch(userDataFetchEnd())
      navigate("/");
    } catch (error) {
      dispatch(userDataFetchEnd())
      if (error.status === 422) {
        setError("serverError", {
          type: "manual",
          message: "Email or Password is incorrect. Please, try again",
        });
      } else {
        console.error(error);
        setError("serverError", {
          type: "manual",
          message: "Uh, oh, that was unexpected server error",
        });
      }
    }
  };
  return (
    <form className={form} onSubmit={handleSubmit(onSubmit)}>
      {loading&&(<ReactLoading type='spin' color='#1890ff' />)}
      <h2 className={form__title}>Sign In</h2>
      <label className={form__userdata}>
        Email address
        <input
          {...register("email", emailValidation)}
          className={`${userdata__input} ${errors.email ? invalid : ""}`}
          type="email"
          placeholder="Email address"
          required
        />
        {errors.email && (
          <span className={userdata__error}>{errors.email.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        Password
        <input
          {...register("password", passwordValidation)}
          className={`${userdata__input} ${errors.password ? invalid : ""}`}
          type="password"
          placeholder="Password"
          required
        />
        {errors.password && (
          <span className={userdata__error}>{errors.password.message}</span>
        )}
      </label>{" "}
      {errors.serverError && (
        <span style={{ color: "red" }}>
          {errors.serverError.message}
        </span>
      )}
      <button
        className={form__submit}
        type="submit"
        onClick={() => {
          clearErrors("serverError");
        }}
      >
        Login
      </button>
      <span className={form__question}>
        Don't have an account?{" "}
        <Link to="/sign-up" className={homepageLink}>
          Sign Up
        </Link>
      </span>
    </form>
  );
};
export default LoginForm;
