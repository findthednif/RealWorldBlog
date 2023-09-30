import React from "react";
import "./App.scss";
import Header from "../Header/Header";
import ArticlesList from "../ArticlesList/ArticlesList";
import ArticleFull from "../ArticleFull/ArticleFull.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<ArticlesList/>} />
          <Route path='/articles/' element={<ArticlesList/>}/>
          <Route path="/articles/:slug" element={<ArticleFull />} />
        </Routes>
      </main>
    </Router>
  );
};
export default App;
