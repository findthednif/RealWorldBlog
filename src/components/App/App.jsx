import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.scss';
import Header from '../Header/Header';
import ArticlesList from '../ArticlesList/ArticlesList';
import ArticleFull from '../ArticleFull/ArticleFull';
import RegistrationForm from '../Forms/RegistrationForm/RegistrationForm';
import ProfileEditForm from '../Forms/ProfileEditForm/ProfileEditForm';
import LoginForm from '../Forms/LoginForm/LoginForm';
import CreateArticleForm from '../Forms/CreateArticleForm/CreateArticleForm';
import { userLogin } from '../Redux/User/actions';
import { getUser } from '../../Services/apiRequests';
import EditArticleForm from '../Forms/EditArticleForm/EditArticleForm';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUser().then((result) => {
        dispatch(userLogin(result));
      });
    }
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<ArticlesList />} />
          <Route path='/articles/' element={<ArticlesList />} />
          <Route path='/articles/:slug' element={<ArticleFull />} />
          <Route path='/sign-up' element={<RegistrationForm />} />
          <Route path='/sign-in' element={<LoginForm />} />
          <Route path='/profile' element={<ProfileEditForm />} />
          <Route path='/new-article' element={<CreateArticleForm />} />
          <Route path='/articles/:slug/edit' element={<EditArticleForm />} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;
