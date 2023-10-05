import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Image } from "antd";
import noAvatarImage from "../../Assets/Avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../Redux/User/actions";
const Header = () => {
  const { authorized, userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const logOut = () =>{
      localStorage.clear();
      dispatch(userLogout())
    }
  const headerContent = () => {
    
    if (!authorized) {
      return (
        <div className="header__main">
          <Link to="/sign-in" className="main__link main__signIn">
            Sign In
          </Link>
          <Link to="/sign-up" className="main__link main__signUp">
            Sign Up
          </Link>
        </div>
      );
    } else
      return (
        <div className="header__main">
          <Link to="/new-article" className="main__link main__createArticle">Create article</Link>
          <Link to="/profile" className="main__link main__username">{userData.username}</Link>
          <Link to="/profile" className="main__link">
            <Image src={userData.image} fallback={noAvatarImage} preview={false}></Image>
          </Link>
          <Link to='/' className="main__link main__logOut" onClick={logOut}>Log Out</Link>
        </div>
      );
  };
  return (
    <header className="header">
      <Link className="header__title" to="/">
        <h2 className="title__text">Realworld Blog</h2>
      </Link>
      {headerContent()}
    </header>
  );
};
export default Header;
