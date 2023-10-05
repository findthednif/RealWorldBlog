import React from "react";
import "./Article.scss";
import noAvatarImage from "../../Assets/Avatar.svg";
import { Typography, Image } from "antd";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import DeleteConfirm from "./DeleteConfirm/DeleteConfirm";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { deleteArticleConfirm } from "../Redux/User/actions";
const { Text } = Typography;
const Article = (props) => {
  const dispatch = useDispatch()
  const {
    title,
    description,
    author,
    imageUrl,
    tagList,
    createTime,
    slug,
    body,
    likes,
  } = props;
  const { userData, deleteConfirm } = useSelector((state) => state.userReducer);
  const isOwner = userData && userData.username === author;
  const [liked, setLiked] = useState(false);
  const tags = tagList.map((tag) => {
    if (tag && tag.trim() !== "") {
      return (
        <Text key={uuidv4()} keyboard>
          {tag}
        </Text>
      );
    } else return null;
  });
  const date = format(new Date(createTime), "MMMM, d, yyyy");
  let titleContent;
  let likeContent;
  if (liked) {
    likeContent = (
      <>
        <HeartFilled
          className="title__like"
          onClick={() => {
            setLiked(!liked);
          }}
        />
        {likes}
      </>
    );
  } else {
    likeContent = (
      <>
        <HeartOutlined
          className="title__dislike"
          onClick={() => {
            setLiked(!liked);
          }}
        />
        {likes}
      </>
    );
  }
  if (body) {
    titleContent = (
      <div className="main__info main__title">
        <Link to={`/`} className="title__link">
          {title}
        </Link>
        {likeContent}
      </div>
    );
  } else {
    titleContent = (
      <div className="main__info main__title">
        <Link to={`/articles/${slug}`} className="title__link">
          {title}
        </Link>
        {likeContent}
      </div>
    );
  }
  return (
    <article className="article">
      <div className="article__main">
        {titleContent}
        <div className="main__info">{tags}</div>
        <div className="main__info">{description}</div>
        {body && <ReactMarkdown className="main__info">{body}</ReactMarkdown>}
      </div>
      <div className="wrap">
        <div className="article__author">
          <div className="author__info">
            <div>{author}</div>
            <Text type="secondary">{date}</Text>
          </div>
          <Image
            className="autor__img"
            src={imageUrl}
            fallback={noAvatarImage}
          ></Image>
        </div>
        {isOwner && body && (
          <>
            <div className="buttons">
              <button
                className="button deleteButton"
                onClick={() => {dispatch(deleteArticleConfirm())}}
              >
                Delete
              </button>
              <Link
                to={`/articles/${slug}/edit`}
                state={{ title, description, body, tagList }}
                className="button editButton"
              >
                Edit
              </Link>
            </div>
            {deleteConfirm && <DeleteConfirm slug={slug}/>}
          </>
        )}
      </div>
    </article>
  );
};
export default Article;
