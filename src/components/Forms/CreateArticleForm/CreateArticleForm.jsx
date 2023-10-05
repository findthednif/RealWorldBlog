import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateArticleForm.module.scss";
import {
  addTag,
  inputTag,
  deleteTag,
  deleteAll,
} from "../../Redux/CreateArticle/action";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { createArticle } from "../../../Services/apiRequests";
import { useNavigate } from "react-router-dom";
import { userDataFetchStart, userDataFetchEnd } from "../../Redux/User/actions";
import ReactLoading from "react-loading";
const CreateArticleForm = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [navigate, token]);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { currentTag, tagsList } = useSelector(
    (state) => state.createArticleReducer
  );
  const { loading } = useSelector((state) => state.userReducer);
  const tagListContent = () => {
    if (tagsList.length !== 0) {
      return tagsList.map((tag, index) => {
        return (
          <li key={uuidv4()}>
            <span className={tagList__tag}>{tag} </span>
            <button
              className={deleteButton}
              type="button"
              onClick={() => {
                dispatch(deleteTag(index));
              }}
            >
              Delete
            </button>
          </li>
        );
      });
    } else return null;
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
      const responce = await createArticle(articleData, token);
      dispatch(deleteAll());
      dispatch(userDataFetchEnd());
      navigate("/");
    } catch (error) {
      dispatch(userDataFetchEnd());
      if (error.status === 422) {
        setError("serverError", {
          type: "manual",
          message: "Wrong data. Please, try again",
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
      {loading && (
        <ReactLoading type="spin" color="#1890ff" className={reactloading} />
      )}
      <h2 className={form__title}>Create new article</h2>
      <label className={form__userdata}>
        Title
        <input
          {...register("title")}
          className={form__input}
          placeholder="Title"
          required
        />
      </label>
      <label className={form__userdata}>
        Short description
        <input
          {...register("description")}
          className={form__input}
          placeholder="Description"
          required
        />
      </label>
      <label className={form__userdata}>
        Text
        <textarea
          {...register("text")}
          placeholder="Text"
          className={`${form__input} ${userData__textarea}`}
          required
        ></textarea>
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
          placeholder="Tag"
          onChange={(evt) => {
            dispatch(inputTag(evt.target.value));
          }}
        />
        {errors.serverError && (
          <span style={{ color: "red" }}>{errors.serverError.message}</span>
        )}
        <button
          className={addButton}
          type="button"
          onClick={() => {
            dispatch(addTag());
            clearErrors("serverError");
          }}
        >
          Add tag
        </button>
      </label>
      <button type="submit" className={sendButton}>
        Send
      </button>
    </form>
  );
};
export default CreateArticleForm;
