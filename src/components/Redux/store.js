import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './Articles/reducer';
import userReducer from './User/reducer'
const store = configureStore({
    reducer: {
        articlesReducer,
        userReducer
    }
})
export default store;