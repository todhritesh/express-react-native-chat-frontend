import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import friendReucer from './slices/friends-slice';
import nonFriendReducer from './slices/non-friends-slice';
import friendRequestReducer from './slices/friend-requests-slice';
import sentRequestReducer from './slices/sent-requests-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: friendReucer,
    nonFriends: nonFriendReducer,
    friendRequests: friendRequestReducer,
    sentRequests: sentRequestReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


