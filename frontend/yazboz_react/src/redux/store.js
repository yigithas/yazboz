import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import articleReducer from './articleSlice';
import commentReducer from './commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    comments: commentReducer,
  },
});