import React from "react";
import "./Article.scss";
import noAvatarImage from "./Avatar.svg";
import { Typography, Image } from "antd";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { Link } from "react-router-dom";
const { Text } = Typography;
const Article = ({
  title,
  description,
  author,
  imageUrl,
  tagList,
  createTime,
  slug,
  body,
}) => {
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
  if (body) {
    titleContent = (
      <h1 className="main__info main__title">
        <Link to={`/`} className="title__link">
          {title}
        </Link>
      </h1>
    );
  } else {
    titleContent = (
      <h1 className="main__info main__title">
        <Link to={`/articles/${slug}`} className="title__link">
          {title}
        </Link>
      </h1>
    );
  }
  return (
    <article className="article">
      <div className="article__main">
        {titleContent}
        <div className="main__info">{tags}</div>
        <div className="main__info">{description}</div>
        {body && <div className="main__info">{body}</div>}
      </div>
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
    </article>
  );
};
export default Article;
