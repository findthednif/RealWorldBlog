import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import {
  usernameValidation,
  emailValidation,
  passwordValidation,
} from '../FormsValidation';
import { registerUser, loginUser } from '../../../Services/apiRequests';
import {
  userDataFetchStart,
  userDataFetchEnd,
  userLogin,
} from '../../Redux/User/actions';

import styles from './RegistrationForm.module.scss';

function RegistrationForm() {
  const {
    form,
    form__title,
    form__userdata,
    userdata__input,
    userdata__input__invalid,
    userdata__error,
    form__agreement,
    agreement__checkbox,
    form__submit,
    form__question,
    question__link,
  } = styles;
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const { loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (userData) => {
    const data = {
      user: userData,
    };
    try {
      dispatch(userDataFetchStart());
      await registerUser(data);
      const responce = await loginUser(data);
      localStorage.setItem('token', JSON.stringify(responce.user.token));
      localStorage.setItem('userData', JSON.stringify(responce));
      dispatch(userLogin(responce));
      dispatch(userDataFetchEnd());
      navigate('/');
    } catch (error) {
      dispatch(userDataFetchEnd());
      console.log(error.status);
      if (error.status === 422) {
        setError('serverError', {
          type: 'manual',
          message: 'Email or username is already registered. Please, try again',
        });
      } else {
        console.error(error);
        setError('serverError', {
          type: 'manual',
          message: 'Uh, oh, that was unexpected server error',
        });
      }
    }
  };
  return (
    <form className={form} onSubmit={handleSubmit(onSubmit)}>
      {loading && <ReactLoading type='spin' color='#1890ff' />}
      <h2 className={form__title}>CREATE NEW ACCOUNT</h2>
      <label className={form__userdata}>
        Username
        <input
          {...register('username', usernameValidation)}
          className={`${userdata__input} ${
            errors.username ? `${userdata__input__invalid}` : ''
          }`}
          type='text'
          placeholder='Username'
        />
        {errors.username && (
          <span className={userdata__error}>{errors.username.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        Email
        <input
          {...register('email', emailValidation)}
          className={`${userdata__input} ${
            errors.email ? `${userdata__input__invalid}` : ''
          }`}
          type='email'
          placeholder='Email address'
        />
        {errors.email && (
          <span className={userdata__error}>{errors.email.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        Password
        <input
          {...register('password', passwordValidation)}
          className={`${userdata__input} ${
            errors.password ? `${userdata__input__invalid}` : ''
          }`}
          type='password'
          placeholder='Password'
        />
        {errors.password && (
          <span className={userdata__error}>{errors.password.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        Repeat Password
        <input
          {...register('confirmPassword', {
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
          className={`${userdata__input} ${
            errors.password ? `${userdata__input__invalid}` : ''
          }`}
          type='password'
          placeholder='Password'
        />
        {errors.confirmPassword && (
          <span className={userdata__error}>
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <label className={form__agreement}>
        <input className={agreement__checkbox} type='checkbox' required />
        <div>I agree to the processing of my personal information</div>
      </label>
      {errors.serverError && (
        <span style={{ color: 'red' }}>{errors.serverError.message}</span>
      )}
      <button
        className={form__submit}
        type='submit'
        onClick={() => {
          clearErrors('serverError');
        }}
      >
        Create
      </button>
      <span className={form__question}>
        Already have an account?{' '}
        <Link to='/sign-in' className={question__link}>
          Sign in
        </Link>
      </span>
    </form>
  );
}
export default RegistrationForm;
