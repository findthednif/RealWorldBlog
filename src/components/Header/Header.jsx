import React from "react";
import './Header.scss'
const Header = () => {
  return (
    <header className="header">
      <h1>Realworld Blog</h1>
      <div>
      <button className="header__button header__signIn">Sign In</button>
      <button className="header__button header__signUp">Sign Up</button>
      </div>
    </header>
  );
};
export default Header