import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import noAvatarImage from '../../Assets/Avatar.svg';
import { userLogout } from '../Redux/User/actions';

import styles from './Header.module.scss';

function Header() {
  const {
    header,
    header__title,
    title__text,
    header__main,
    main__link,
    main__image,
    main__signIn,
    main__signUp,
    main__createArticle,
    main__logOut,
    main__username,
  } = styles;
  const { authorized, userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.clear();
    dispatch(userLogout());
  };
  const headerContent = () => {
    if (!authorized) {
      return (
        <div className={header__main}>
          <Link to='/sign-in' className={`${main__link} ${main__signIn}`}>
            Sign In
          </Link>
          <Link to='/sign-up' className={`${main__link} ${main__signUp}`}>
            Sign Up
          </Link>
        </div>
      );
    }
    return (
      <div className={header__main}>
        <Link
          to='/new-article'
          className={`${main__link} ${main__createArticle}`}
        >
          Create article
        </Link>
        <Link to='/profile' className={`${main__link} ${main__username}`}>
          {userData.username}
        </Link>
        <Link to='/profile' className={main__link}>
          <Image
            className={main__image}
            src={userData.image}
            fallback={noAvatarImage}
            preview={false}
          />
        </Link>
        <Link
          to='/'
          className={`${main__link} ${main__logOut}`}
          onClick={logOut}
        >
          Log Out
        </Link>
      </div>
    );
  };
  return (
    <header className={header}>
      <Link className={header__title} to='/'>
        <h2 className={title__text}>Realworld Blog</h2>
      </Link>
      {headerContent()}
    </header>
  );
}
export default Header;
