import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

import { editArticle } from '../../../Services/apiRequests';
import { userDataFetchStart, userDataFetchEnd } from '../../Redux/User/actions';
import {
  addTag,
  inputTag,
  deleteTag,
  deleteAll,
} from '../../Redux/CreateArticle/action';

import styles from './EditArticleForm.module.scss';

function EditArticleForm() {
  const {
    form,
    form__title,
    form__userdata,
    form__input,
    form__addTag,
    form__taglist,
    form__taginput,
    reactloading,
    userData__textarea,
    deleteButton,
    addButton,
    tagList__tag,
    sendButton,
  } = styles;
  const { slug } = useParams();
  const { title, description, body, tagList } = useLocation().state;
  const token = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
    if (tagList.length !== 0) {
      tagList.forEach((tag) => {
        dispatch(addTag(tag));
      });
    }
  }, [dispatch, navigate, token, tagList]);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const { currentTag, tagsList } = useSelector(
    (state) => state.createArticleReducer,
  );
  const { loading } = useSelector((state) => state.userReducer);
  const tagListContent = () => {
    if (tagsList.length !== 0) {
      return tagsList.map((tag, index) => (
        <li key={uuidv4()}>
          <span className={tagList__tag}>{tag} </span>
          <button
            className={deleteButton}
            type='button'
            onClick={() => {
              console.log(index);
              dispatch(deleteTag(index));
            }}
          >
            Delete
          </button>
        </li>
      ));
    }
    return null;
  };
  const onSubmit = async (data) => {
    const articleData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagsList,
      },
    };
    try {
      dispatch(userDataFetchStart());
      await editArticle(articleData, slug);
      dispatch(deleteAll());
      dispatch(userDataFetchEnd());
      navigate('/');
    } catch (error) {
      dispatch(userDataFetchEnd());
      if (error.status === 422) {
        setError('serverError', {
          type: 'manual',
          message: 'Wrong data. Please, try again',
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
      {loading && (
        <ReactLoading type='spin' color='#1890ff' className={reactloading} />
      )}
      <h2 className={form__title}>Edit article</h2>
      <label className={form__userdata}>
        Title
        <input
          {...register('title')}
          defaultValue={title}
          className={form__input}
          placeholder='Title'
          required
        />
      </label>
      <label className={form__userdata}>
        Short description
        <input
          {...register('description')}
          defaultValue={description}
          className={form__input}
          placeholder='Description'
          required
        />
      </label>
      <label className={form__userdata}>
        Text
        <textarea
          {...register('text')}
          defaultValue={body}
          placeholder='Text'
          className={`${form__input} ${userData__textarea}`}
          required
        />
      </label>
      {tagListContent() && (
        <ul className={form__taglist}>
          Tags
          {tagListContent()}
        </ul>
      )}
      <label className={form__addTag}>
        <input
          value={currentTag}
          className={`${form__input} ${form__taginput}`}
          placeholder='Tag'
          onChange={(evt) => {
            dispatch(inputTag(evt.target.value));
          }}
        />
        {errors.serverError && (
          <span style={{ color: 'red' }}>{errors.serverError.message}</span>
        )}
        <button
          className={addButton}
          type='button'
          onClick={() => {
            dispatch(addTag());
            clearErrors('serverError');
          }}
        >
          Add tag
        </button>
      </label>
      <button type='submit' className={sendButton}>
        Send
      </button>
    </form>
  );
}
export default EditArticleForm;
