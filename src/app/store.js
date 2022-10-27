import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../feature/posts.slice';
import userReducer from '../feature/user.slice';
import userProfilReducer from '../feature/userProfil.slice';

export default configureStore({
  reducer: {
    postReducer: postReducer,
    userReducer: userReducer,
    userProfilReducer: userProfilReducer,
  },
});
