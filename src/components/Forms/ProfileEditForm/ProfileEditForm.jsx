import styles from "./ProfileEditForm.module.scss";
import { useForm } from "react-hook-form";
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
} from "../FormsValidation";
import { editUser } from "../../../Services/apiRequests";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogin,
  userDataFetchStart,
  userDataFetchEnd,
} from "../../Redux/User/actions";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { useEffect } from "react";
const ProfileEditForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "all" });
  const {
    form,
    form__title,
    form__userdata,
    userdata__input,
    userdata__error,
    invalid,
    form__submit,
  } = styles;
  const { userData, loading, authorized } = useSelector((state) => state.userReducer);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!authorized){
      navigate('/sign-in')
    }
  },[navigate, authorized])
  const onSubmit = async (data) => {
    dispatch(userDataFetchStart());
    const request = {
      user: data,
    };
    const responce = await editUser(request, userData.token);
    dispatch(userLogin(responce));
    dispatch(userDataFetchEnd());
    navigate("/");
  };
  return (
    <form className={form} onSubmit={handleSubmit(onSubmit)}>
      {loading && <ReactLoading type="spin" color="#1890ff" />}
      <h2 className={form__title}>Edit Profile</h2>
      <label className={form__userdata}>
        Username
        <input
          {...register("username", usernameValidation)}
          className={`${userdata__input} ${errors.username ? invalid : ""}`}
          type="text"
          placeholder="Username"
        />
        {errors.username && (
          <span className={userdata__error}>{errors.username.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        Email address
        <input
          {...register("email", emailValidation)}
          className={`${userdata__input} ${errors.email ? invalid : ""}`}
          type="email"
          placeholder="Email address"
        />
        {errors.email && (
          <span className={userdata__error}>{errors.email.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        New password
        <input
          {...register("password", passwordValidation)}
          className={`${userdata__input} ${errors.email ? invalid : ""}`}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <span className={userdata__error}>{errors.password.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        Avatar image (url)
        <input
          {...register("avatarImg")}
          className={userdata__input}
          type="text"
          placeholder="Avatar image"
        />
      </label>
      {errors.emptyForm && (
        <span style={{ color: "red" }}>{errors.emptyForm.message}</span>
      )}
      <button
        className={form__submit}
        type="submit"
        onClick={() => {
          clearErrors("emptyForm");
        }}
      >
        Save
      </button>
    </form>
  );
};
export default ProfileEditForm;
