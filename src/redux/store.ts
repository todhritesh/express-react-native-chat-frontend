import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import friendReucer from './slices/friends-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendReucer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

