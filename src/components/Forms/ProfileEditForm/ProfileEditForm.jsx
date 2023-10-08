import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useEffect } from 'react';

import {
  userLogin,
  userDataFetchStart,
  userDataFetchEnd,
} from '../../Redux/User/actions';
import { editUser } from '../../../Services/apiRequests';
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
} from '../FormsValidation';

import styles from './ProfileEditForm.module.scss';

function ProfileEditForm() {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const {
    form,
    form__title,
    form__userdata,
    userdata__input,
    userdata__error,
    invalid,
    form__submit,
  } = styles;
  const { loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  }, [navigate, token]);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      dispatch(userDataFetchStart());
      const request = {
        user: data,
      };
      const responce = await editUser(request);
      dispatch(userLogin(responce));
      dispatch(userDataFetchEnd());
      navigate('/');
    } catch (error) {
      dispatch(userDataFetchEnd());
      if (error.status === 422) {
        setError('serverError', {
          type: 'manual',
          message: 'Email is busy. Please, try again',
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
      <h2 className={form__title}>Edit Profile</h2>
      <label className={form__userdata}>
        Username
        <input
          {...register('username', usernameValidation)}
          className={`${userdata__input} ${errors.username ? invalid : ''}`}
          type='text'
          placeholder='Username'
        />
        {errors.username && (
          <span className={userdata__error}>{errors.username.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        Email address
        <input
          {...register('email', emailValidation)}
          className={`${userdata__input} ${errors.email ? invalid : ''}`}
          type='email'
          placeholder='Email address'
        />
        {errors.email && (
          <span className={userdata__error}>{errors.email.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        New password
        <input
          {...register('password', passwordValidation)}
          className={`${userdata__input} ${errors.email ? invalid : ''}`}
          type='password'
          placeholder='Password'
        />
        {errors.password && (
          <span className={userdata__error}>{errors.password.message}</span>
        )}
      </label>
      <label className={form__userdata}>
        Avatar image (url)
        <input
          {...register('image')}
          className={userdata__input}
          type='text'
          placeholder='Avatar image'
        />
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
        Save
      </button>
    </form>
  );
}
export default ProfileEditForm;
