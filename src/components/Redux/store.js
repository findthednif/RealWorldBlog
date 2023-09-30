import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesReducer';
const store = configureStore({
    reducer: {
        articlesReducer,
    }
})
export default store;