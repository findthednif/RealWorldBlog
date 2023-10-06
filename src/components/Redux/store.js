import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './Articles/reducer';
import userReducer from './User/reducer';
import createArticleReducer from './CreateArticle/reducer';

const store = configureStore({
  reducer: {
    articlesReducer,
    userReducer,
    createArticleReducer,
  },
});
export default store;
