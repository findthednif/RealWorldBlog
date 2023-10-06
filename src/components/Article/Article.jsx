import './Article.scss';

import { Typography, Image } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';

import noAvatarImage from '../../Assets/Avatar.svg';
import { deleteArticleConfirm } from '../Redux/User/actions';
import { favoriteArticle, unFavoriteArticle } from '../../Services/apiRequests';

import DeleteConfirm from './DeleteConfirm/DeleteConfirm';

const { Text } = Typography;
function Article(props) {
  const dispatch = useDispatch();
  const {
    title,
    description,
    author,
    imageUrl,
    tagList,
    createTime,
    slug,
    body,
    liked,
    likes,
  } = props;
  const token = localStorage.getItem('token');
  const [isLiked, setIsLiked] = useState(liked);
  const [likedCount, setLikedCount] = useState(likes);
  const { userData, deleteConfirm } = useSelector((state) => state.userReducer);
  const isOwner = userData && userData.username === author;
  const tags = tagList.map((tag) => {
    if (tag && tag.trim() !== '') {
      return (
        <Text key={uuidv4()} keyboard>
          {tag}
        </Text>
      );
    }
    return null;
  });
  const date = format(new Date(createTime), 'MMMM, d, yyyy');
  const likeArticle = async () => {
    if (token) {
      try {
        if (!isLiked) {
          setIsLiked(!isLiked);
          setLikedCount(likedCount + 1);
          await favoriteArticle(slug);
        } else {
          setIsLiked(!isLiked);
          setLikedCount(likedCount - 1);
          await unFavoriteArticle(slug);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  let titleContent;
  let likeContent;
  if (isLiked) {
    likeContent = (
      <div className='title__likes'>
        <button type='button' onClick={() => likeArticle(slug)}>
          <HeartFilled className='likes__like' />
        </button>
        <span>{likedCount}</span>
      </div>
    );
  } else {
    likeContent = (
      <div className='title__likes'>
        <button type='button' onClick={() => likeArticle(slug)}>
          <HeartOutlined className='likes__dislike' />
        </button>
        {likedCount}
      </div>
    );
  }
  if (body) {
    titleContent = (
      <div className='main__info main__title'>
        <Link to='/' className='title__link'>
          {title}
        </Link>
        {likeContent}
      </div>
    );
  } else {
    titleContent = (
      <div className='main__info main__title'>
        <Link to={`/articles/${slug}`} className='title__link'>
          {title}
        </Link>
        {likeContent}
      </div>
    );
  }
  return (
    <article className='article'>
      <div className='article__main'>
        {titleContent}
        <div className='main__info'>{tags}</div>
        <div className='main__info'>{description}</div>
        {body && <ReactMarkdown className='main__info'>{body}</ReactMarkdown>}
      </div>
      <div className='wrap'>
        <div className='article__author'>
          <div className='author__info'>
            <div>{author}</div>
            <Text type='secondary'>{date}</Text>
          </div>
          <Image
            className='autor__img'
            src={imageUrl}
            fallback={noAvatarImage}
          />
        </div>
        {isOwner && body && (
          <>
            <div className='buttons'>
              <button
                type='button'
                className='button deleteButton'
                onClick={() => {
                  dispatch(deleteArticleConfirm());
                }}
              >
                Delete
              </button>
              <Link
                to={`/articles/${slug}/edit`}
                state={{ title, description, body, tagList }}
                className='button editButton'
              >
                Edit
              </Link>
            </div>
            {deleteConfirm && <DeleteConfirm slug={slug} />}
          </>
        )}
      </div>
    </article>
  );
}
export default Article;
